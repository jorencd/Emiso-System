import React, { useEffect, useRef, useState } from "react";
import Modal from "../modal/BooksModal";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function JournalCard({ title, pdfUrl, bgImageUrl }) {

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
          canvas.className = "mb-6 shadow-md rounded";
  
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

  return (
    <>
      {/* CARD */}
      <div
        className="
      lg:h-20 group flex items-center gap-4
      border rounded-lg shadow-md
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

        <p className="flex-1 font-semibold text-left m-4">
          {title}
        </p>
      </div>

      {/* MODAL */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-10">
          <h2 className="font-semibold text-lg truncate">{title}</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-red-500 font-bold text-lg hover:scale-110 transition"
          >
            ✕
          </button>
        </div>

        {/* PDF DISPLAY AREA */}
        <div className="relative flex-1 overflow-auto bg-gray-200 p-6">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <div
            ref={pdfContainerRef}
            className="flex flex-col items-center"
          />
        </div>
      </Modal>
    </>
  );
}

export default JournalCard;
