import React, { useEffect, useRef, useState } from "react";
import Modal from "../modal/BooksModal";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import { Icon } from "@iconify/react";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function Card({ title, pdfUrl }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pdfContainerRef = useRef(null);

  useEffect(() => {
    if (!isModalOpen || !pdfUrl) return;

    const loadPDF = async () => {
      setIsLoading(true);
      pdfContainerRef.current.innerHTML = "";

      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.className = "mb-6 rounded shadow-md";

        pdfContainerRef.current.appendChild(canvas);

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;
      }

      setIsLoading(false);
    };

    loadPDF();
  }, [isModalOpen, pdfUrl]);

  const truncateTitle = (text, wordLimit = 3) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <>
      {/* CARD */}
      <div
        className="h-35 cursor-pointer hover:bg-neutral-100 bg-white rounded-b-lg border-t-8 border-green-400 px-4 py-5 flex flex-col justify-around shadow-md transition"
        onClick={() => setIsModalOpen(true)}
      >
        <p className="text-base font-bold font-sans" title={title}>
          {truncateTitle(title)}
        </p>

        <div className="flex justify-between items-center">
          <Icon
            icon="material-symbols-light:book-ribbon-rounded"
            width="30"
            height="30"
            className="text-neutral-400"
          />

          <button
            className="bg-slate-200 px-5 rounded-xl cursor-pointer hover:bg-slate-400 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            View
          </button>
        </div>
      </div>

      {/* MODAL */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white border-b">
          <h2 className="text-lg font-semibold truncate">{title}</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-lg font-bold text-red-500 transition hover:scale-110"
          >
            ✕
          </button>
        </div>

        {/* PDF DISPLAY */}
        <div className="relative flex-1 p-6 overflow-auto bg-gray-200">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
              <div className="w-10 h-10 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
          )}

          <div ref={pdfContainerRef} className="flex flex-col items-center" />
        </div>
      </Modal>
    </>
  );
}

export default Card;