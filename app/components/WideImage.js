import styles from "../page.module.css";

const WideImage = ({ backgroundImage }) => {
  if (backgroundImage === "doctor-patient1")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgDoctorPatient1}
      ></div>
    );
  if (backgroundImage === "doctor-patient2")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgDoctorPatient2}
      ></div>
    );
  if (backgroundImage === "doctor-patient3")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgDoctorPatient3}
      ></div>
    );
  if (backgroundImage === "doctor-patient4")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgDoctorPatient4}
      ></div>
    );
  if (backgroundImage === "doctor-patient5")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgDoctorPatient5}
      ></div>
    );
  if (backgroundImage === "cleaning1")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgCleaning1}
      ></div>
    );
  if (backgroundImage === "community1")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgCommunity1}
      ></div>
    );
  if (backgroundImage === "community2")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgCommunity2}
      ></div>
    );
  if (backgroundImage === "community3")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgCommunity3}
      ></div>
    );
  if (backgroundImage === "inspection1")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgInspection1}
      ></div>
    );
  if (backgroundImage === "inspection2")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgInspection2}
      ></div>
    );
  if (backgroundImage === "recovery1")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgRecovery1}
      ></div>
    );
  if (backgroundImage === "recovery2")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgRecovery2}
      ></div>
    );
  if (backgroundImage === "recovery3")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgRecovery3}
      ></div>
    );
  if (backgroundImage === "recovery4")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgRecovery4}
      ></div>
    );
  if (backgroundImage === "recovery5")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgRecovery5}
      ></div>
    );
  if (backgroundImage === "recovery6")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgRecovery6}
      ></div>
    );
  if (backgroundImage === "remediation1")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgRemediation1}
      ></div>
    );
  if (backgroundImage === "remediation2")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgRemediation2}
      ></div>
    );
  if (backgroundImage === "remediation3")
    return (
      <div
        style={{ marginBottom: "20px" }}
        className={styles.wideImgRemediation3}
      ></div>
    );

  return (
    <div
      style={{ marginBottom: "20px" }}
      className={styles.wideImgDoctorPatient3}
    ></div>
  );
};

export default WideImage;
