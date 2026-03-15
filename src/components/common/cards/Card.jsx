import React, { useEffect, useRef, useState } from "react";
import Modal from "../modal/BooksModal";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import { Icon } from "@iconify/react";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function Card({ title, pdfUrl, bgImageUrl }) {
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

  // Function to truncate title to first 3 words
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
        className="
      lg:h-20 group flex items-center gap-4
      border border-gray-400 rounded-lg shadow-md
      cursor-pointer overflow-hidden
      transition-shadow duration-300
      hover:shadow-xl
      "
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={bgImageUrl}
          alt={title}
          className="
          h-full w-20 object-cover
          transition-transform duration-300 
          group-hover:scale-110
          "
        />

        <p className="flex-1 font-semibold text-left m-4" title={title}>
          {truncateTitle(title)}
        </p>
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

        {/* PDF DISPLAY AREA */}
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
