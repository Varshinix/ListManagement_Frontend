import { useState } from "react";
import styles from "./linkModal.module.css";
import closeIcon from "../../assets/closeIcon.png";

export default function NewLinkModal({ onClose, onCreate }) {
    const [destinationUrl, setDestinationUrl] = useState("");
    const [remarks, setRemarks] = useState("");
    const [expiresAt, setExpiresAt] = useState("");
    const [isExpirationEnabled, setIsExpirationEnabled] = useState(false);

    const handleSubmit = () => {
        if (!destinationUrl || !remarks) {
            alert("Destination URL and Remarks are required.");
            return;
        }

        onCreate({
            originalUrl: destinationUrl,
            remarks,
            expiresAt: isExpirationEnabled ? expiresAt : null,
        });

        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {/* Header */}
                <div className={styles.modalHeader}>
                    <h3>New Link</h3>
                    <img src={closeIcon} alt="Close" className={styles.closeIcon} onClick={onClose} />
                </div>

                {/* Fields */}
                <div className={styles.modalBody}>
                    <label><span className={styles.inputTitle}>Destination URL</span><span className={styles.star}>*</span> </label>
                    <input className={styles.placeholder} type="text" value={destinationUrl}
                        onChange={(e) => setDestinationUrl(e.target.value)}
                        placeholder="Enter URL"
                    /> <br />

                    <label><span className={styles.inputTitle}>Remarks</span> <span className={styles.star}>*</span> </label>
                    <input className={styles.placeholder}
                        type="text"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Enter remarks"
                    /> <br />

                    <label className={styles.toggleSwitch}>
                    <span className={styles.labelText}>Link Expiration</span>
                        <input
                            type="checkbox"
                            checked={isExpirationEnabled}
                            onChange={() => setIsExpirationEnabled(!isExpirationEnabled)}
                        />
                        <span className={styles.slider}></span>
                        
                    </label>

                    {isExpirationEnabled && (
                        <div className={styles.dateInputContainer}>
                            <input
                                type="datetime-local"
                                value={expiresAt}
                                onChange={(e) => setExpiresAt(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className={styles.modalFooter}>
                    <button className={styles.clearButton} onClick={() => {
                        setDestinationUrl("");
                        setRemarks("");
                        setExpiresAt("");
                        setIsExpirationEnabled(false);
                    }}>
                        Clear
                    </button>
                    <button className={styles.createButton} onClick={handleSubmit}>
                        Create New
                    </button>
                </div>
            </div>
        </div>
    );
}
