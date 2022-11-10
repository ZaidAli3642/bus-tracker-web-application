import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useLocation } from "react-router-dom";
import { PdfExport, useGeneratePdf } from "@garage-panda/react-pdf-export";

import { useRef } from "react";

function PDFFile() {
  const location = useLocation();
  const { generatePdf, containerRef } = useGeneratePdf();
  const { firstname, lastname, image, rollNo, institute } =
    location?.state?.studentdata || {};

  const cardRef = useRef();

  const [url, setUrl] = useState("");
  const generateQRCode = (data) => {
    QRCode.toDataURL(
      JSON.stringify(location?.state?.studentdata),
      (err, url) => {
        if (err) return console.log("ERROR URL : ", err);
        setUrl(url);
      }
    );
  };

  useEffect(() => {
    generateQRCode();
  }, []);

  return (
    <>
      {url && (
        <PdfExport className="pdf" containerRef={containerRef}>
          <div
            ref={cardRef}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginInline: 40,
            }}
          >
            <div>
              <img
                src={image}
                style={{ width: 100, height: 100, marginRight: 20 }}
              />
            </div>
            <div style={{ flexDirection: "row" }}>
              <div style={{ flexDirection: "row" }}>
                <label className="label">Student Name: </label>
                <span
                  style={{ marginLeft: 10 }}
                >{`${firstname} ${lastname}`}</span>
              </div>
              <div style={{ flexDirection: "row" }}>
                <label className="label">Roll No: </label>
                <span style={{ marginLeft: 10 }}>{rollNo}</span>
              </div>

              <div style={{ flexDirection: "row" }}>
                <label className="label">Institute Name: </label>
                <span style={{ marginLeft: 10 }}>
                  {institute.split(" ").length > 3
                    ? institute.split(" ").slice(0, 2).join(" ")
                    : institute}
                </span>
              </div>
            </div>
            <div>
              <img src={url} style={{ width: 150, height: 150 }} />
            </div>
          </div>
        </PdfExport>
      )}
      {url && (
        <button className="btn btn-md btn-primary button" onClick={generatePdf}>
          Download PDF
        </button>
      )}
    </>
  );
}

export default PDFFile;
