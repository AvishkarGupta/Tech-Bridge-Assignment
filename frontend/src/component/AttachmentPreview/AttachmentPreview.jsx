import styles from "./AttachmentPreview.module.css"

export function AttachmentPreview({ file }) {

  const getFileType = (url) => {
   return url.split(".").pop().toLowerCase();
  };

  if (!file?.url) return null;
  const fileType = getFileType(file.url);

  if (fileType === "pdf") {
    return (
      <iframe className={styles.iframe}
        src={file.url}
        title={file.name}
      />
    );
  }

  if (["png", "jpg", "jpeg", "webp"].includes(fileType)) {
  return (
    <img
      src={file.url}
      alt={file.name}
      style={{ maxWidth: "100%", borderRadius: "8px" }}
    />
  );
  }

  return null;
}
