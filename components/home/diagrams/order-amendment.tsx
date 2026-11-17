import styles from "./diagrams.module.css";

const STEPS = [
  { label: "Order placed", state: "done" },
  { label: "Picked", state: "done" },
  { label: "On the way", state: "current" },
  { label: "Delivered", state: "todo" },
] as const;

const Check = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/** FairPrice — order status steps plus the post-order amendment banner. */
const OrderAmendment = () => (
  <div className={`${styles.frame} ${styles.oaFrame}`}>
    <div className={styles.oa}>
      <div className={styles.oaSteps}>
        <div aria-hidden="true" className={styles.oaTrack} />
        <ol className={styles.oaStepList} aria-label="Order status">
          {STEPS.map((step) => (
            <li
              key={step.label}
              className={styles.oaStep}
              data-state={step.state}
            >
              <span className={styles.oaBullet}>
                {step.state === "done" ? <Check /> : null}
              </span>
              <span>{step.label}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.oaSummary}>
        <div className={styles.oaOrder}>
          <span>ORDER #A48210</span>
          <span className={styles.oaSlot}>SLOT KEPT · 6–8PM</span>
        </div>
        <div className={styles.oaRow}>
          <span>Delivery fee</span>
          <span className={styles.oaFee}>
            S$4.99
            <span aria-hidden="true" className={styles.oaStrike} />
          </span>
        </div>
        <div className={styles.oaWaived}>
          <span>Amendment fees</span>
          <span>Waived</span>
        </div>
      </div>

      <div className={styles.oaBanner}>
        <div className={styles.oaBannerText}>
          <span>
            Add more items to your order before <strong>6PM</strong> — no extra
            delivery or amendment fees.
          </span>
          <span className={styles.oaBannerCta}>Add items</span>
        </div>
        <div aria-hidden="true" className={styles.oaBannerArt} />
      </div>
    </div>
  </div>
);

export default OrderAmendment;
