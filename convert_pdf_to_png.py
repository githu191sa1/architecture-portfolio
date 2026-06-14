#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
PDF 轉 PNG 腳本 (convert_pdf_to_png.py)
--------------------------------------
使用方式範例：
python convert_pdf_to_png.py

功能：
1. 檢查並提示 PyMuPDF 套件安裝。
2. 遍歷 raw_images/weaver/plans/ 與 raw_images/weaver/sections/ 資料夾。
3. 將其中的 PDF 檔案逐頁以約 150 DPI 轉換成 PNG 並儲存在同目錄下。
4. 若 PDF 僅有 1 頁，命名為原檔名.png；多頁則為原檔名_page1.png、原檔名_page2.png。
"""

import os
import sys

# 1. 檢查 PyMuPDF 套件是否安裝
try:
    import fitz  # PyMuPDF
except ImportError:
    print("====================================================")
    print("錯誤：偵測到未安裝必要的 'PyMuPDF' (fitz) PDF 處理套件。")
    print("請使用以下指令安裝 PyMuPDF 後再重新運行腳本：")
    print("pip install PyMuPDF --break-system-packages")
    print("====================================================")
    sys.exit(1)

def convert_pdf_to_png():
    target_dirs = [
        "raw_images/weaver/plans",
        "raw_images/weaver/sections"
    ]

    print("開始進行 PDF 轉 PNG 批次處理...")
    print("-" * 60)

    total_pdf_count = 0
    converted_pages_count = 0

    for target_dir in target_dirs:
        if not os.path.exists(target_dir):
            print(f"提示：資料夾 '{target_dir}' 不存在，跳過。")
            continue

        # 搜尋該資料夾下的所有 PDF 檔案
        for file in os.listdir(target_dir):
            if file.lower().endswith('.pdf'):
                pdf_path = os.path.join(target_dir, file)
                file_name_without_ext = os.path.splitext(file)[0]
                total_pdf_count += 1

                print(f"處理: {target_dir}/{file}")

                try:
                    # 開啟 PDF 檔案
                    doc = fitz.open(pdf_path)
                    num_pages = len(doc)

                    # 設定轉換 DPI 約 150 (Default 72, 150 / 72 = 2.0833)
                    # 我們使用 2.0 倍縮放，獲得約 144 DPI 的清晰影像
                    zoom = 2.0
                    mat = fitz.Matrix(zoom, zoom)

                    for page_num in range(num_pages):
                        page = doc[page_num]
                        pix = page.get_pixmap(matrix=mat)

                        # 設定輸出檔名
                        if num_pages == 1:
                            out_filename = f"{file_name_without_ext}.png"
                        else:
                            out_filename = f"{file_name_without_ext}_page{page_num + 1}.png"

                        out_path = os.path.join(target_dir, out_filename)
                        
                        # 儲存為 PNG
                        pix.save(out_path)
                        converted_pages_count += 1
                        print(f"  → 輸出: {target_dir}/{out_filename}")

                    doc.close()
                except Exception as e:
                    print(f"  ✕ 處理失敗: {e}")

                print("-" * 60)

    print(f"\n批次處理完成！")
    print(f"  成功處理 PDF 檔案數量: {total_pdf_count}")
    print(f"  共輸出 PNG 圖片張數: {converted_pages_count}")

if __name__ == "__main__":
    convert_pdf_to_png()
