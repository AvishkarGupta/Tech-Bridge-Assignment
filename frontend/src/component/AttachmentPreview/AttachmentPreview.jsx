import styles from "./AttachmentPreview.module.css"

function AttachmentPreview({ file }) {

  const getFileType = (url = "") => {
    if (typeof url !== "string") return "";
    return url.split(".").pop().toLowerCase();
  };


  if (!file?.url) return null;
  const fileType = getFileType(file.url);

  if (fileType === "pdf") {
    return (
      <iframe
        className={styles.iframe}
        src={file.url}
        title={String(file.name || "attachment")}
      />
    );
  }

  if (["png", "jpg", "jpeg", "webp"].includes(fileType)) {
  return (
    <img
      src={file.url}
      alt={String(file.name || "attachment")}
      style={{ maxWidth: "100%", borderRadius: "8px" }}
    />
  );
  }

  return null;
}


export default AttachmentPreview;
