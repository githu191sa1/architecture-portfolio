#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
圖片批次處理腳本 (process_images.py)
--------------------------------------
使用方式範例：
python process_images.py raw_images

功能：
1. 遍歷輸入資料夾及其子目錄下的所有 .jpg, .jpeg, .png 檔案。
2. 若長邊大於 2000px，等比例縮放至長邊 = 2000px；小於 2000px 則保持原大小。
3. 轉換為 WebP 格式（品質參數 85）。
4. 輸出至 processed_images/，並保持原有目錄結構。
5. 顯示壓縮前後的尺寸與檔案大小變化。
"""

import os
import sys

# 1. 檢查 Pillow 套件是否安裝
try:
    from PIL import Image
except ImportError:
    print("====================================================")
    print("錯誤：偵測到未安裝必要的 'Pillow' 圖片處理套件。")
    print("請使用以下指令安裝 Pillow 後再重新運行腳本：")
    print("pip install Pillow --break-system-packages")
    print("====================================================")
    sys.exit(1)

def process_images(input_dir):
    # 檢查輸入資料夾是否存在
    if not os.path.exists(input_dir):
        print(f"錯誤：輸入路徑 '{input_dir}' 不存在。")
        sys.exit(1)

    output_dir = "processed_images"
    
    print(f"開始掃描資料夾 '{input_dir}' ...")
    print(f"處理後圖片將輸出至 '{output_dir}/'\n")

    processed_count = 0
    failed_count = 0

    # 遍歷資料夾及子目錄
    for root, dirs, files in os.walk(input_dir):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in ['.jpg', '.jpeg', '.png']:
                src_path = os.path.join(root, file)
                
                # 計算相對路徑以保持子目錄結構
                rel_path = os.path.relpath(root, input_dir)
                
                # 建立目標目錄
                dest_dir = os.path.join(output_dir, rel_path)
                if not os.path.exists(dest_dir):
                    os.makedirs(dest_dir)
                
                # 設定輸出檔案路徑為 .webp 格式
                filename_without_ext = os.path.splitext(file)[0]
                dest_path = os.path.join(dest_dir, f"{filename_without_ext}.webp")

                try:
                    # 取得原始檔案大小 (KB)
                    src_size = os.path.getsize(src_path) / 1024.0
                    
                    # 開啟並處理圖片
                    with Image.open(src_path) as img:
                        width, height = img.size
                        max_dim = max(width, height)
                        
                        # 長邊大於 2000px 則等比例縮小
                        if max_dim > 2000:
                            scale = 2000.0 / max_dim
                            new_width = int(width * scale)
                            new_height = int(height * scale)
                            
                            # 使用 LANCZOS 進行高畫質縮放
                            img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                            size_str = f"{width}x{height} -> {new_width}x{new_height}"
                            
                            # 儲存為 WebP
                            img_resized.save(dest_path, "WEBP", quality=85)
                        else:
                            size_str = f"{width}x{height} (保持原尺寸)"
                            
                            # 直接儲存為 WebP
                            img.save(dest_path, "WEBP", quality=85)
                    
                    # 取得處理後的檔案大小 (KB)
                    dest_size = os.path.getsize(dest_path) / 1024.0
                    compression = (1.0 - (dest_size / src_size)) * 100.0 if src_size > 0 else 0.0
                    
                    print(f"● 處理成功: {src_path}")
                    print(f"  尺寸: {size_str}")
                    print(f"  大小: {src_size:.2f} KB -> {dest_size:.2f} KB (壓縮率: {compression:.1f}%)")
                    print("-" * 50)
                    processed_count += 1

                except Exception as e:
                    print(f"✕ 處理失敗: {src_path}")
                    print(f"  錯誤原因: {e}")
                    print("-" * 50)
                    failed_count += 1

    print(f"\n處理完成！")
    print(f"  成功處理: {processed_count} 張圖片")
    if failed_count > 0:
        print(f"  處理失敗: {failed_count} 張圖片")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("錯誤：缺少輸入路徑參數。")
        print("使用說明：")
        print("  python process_images.py <輸入資料夾路徑>")
        print("範例：")
        print("  python process_images.py raw_images")
        sys.exit(1)

    process_images(sys.argv[1])
