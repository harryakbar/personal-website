import Image from "next/image";
import type { ReactNode } from "react";

import styles from "./diagrams.module.css";

const Mark = ({ src }: { src: string }) => (
  <Image src={src} alt="" width={32} height={32} />
);

const Phone = ({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) => (
  <figure className={styles.phoneFig}>
    <div className={styles.phoneShell}>
      <div className={styles.phone}>
        <div className={styles.status}>
          <span>09:24</span>
          <span aria-hidden="true" className={styles.signal}>
            <span />
            <span />
            <span />
            <span />
          </span>
        </div>
        <div className={styles.appBar}>
          <span aria-hidden="true" className={styles.appBack}>
            ←
          </span>
          <span>Checking</span>
        </div>
        {children}
      </div>
    </div>
    <figcaption className={styles.phoneCaption}>{caption}</figcaption>
  </figure>
);

const Pill = ({
  tone,
  children,
}: {
  tone?: "yellow" | "green";
  children: ReactNode;
}) => (
  <span className={styles.pill} data-tone={tone}>
    {children}
  </span>
);

const TaskList = () => (
  <Phone caption="01 · CHECKING TASK LIST">
    <div className={styles.phoneBody}>
      <div className={styles.sectionLabel}>BELUM SELESAI</div>
      <div className={styles.pCard}>
        <div className={`${styles.split} ${styles.small}`}>
          <span>Tangkot 1 - MH-TEST1</span>
          <span>Waktu Loading</span>
        </div>
        <div className={`${styles.split} ${styles.big}`}>
          <span>F10R1</span>
          <span>09:20</span>
        </div>
        <Pill tone="yellow">SEDANG DIKERJAKAN</Pill>
        <div className={styles.counter}>
          <span style={{ color: "#606060" }}>Sudah Dicek</span>
          <span className={styles.bold}>1 dari 4 Order</span>
        </div>
        <div className={styles.cta}>Lihat Checklist</div>
      </div>
      <div className={styles.pCard}>
        <div className={`${styles.split} ${styles.small}`}>
          <span>Tangkot 2 - MH-TEST1</span>
          <span>Waktu Loading</span>
        </div>
        <div className={`${styles.split} ${styles.big}`}>
          <span>F10R2</span>
          <span>10:05</span>
        </div>
        <Pill>BELUM DIKERJAKAN</Pill>
      </div>
    </div>
  </Phone>
);

const Outlet = ({
  name,
  sku,
  checked,
}: {
  name: string;
  sku: string;
  checked?: boolean;
}) => (
  <div className={styles.pCard} style={{ gap: 0 }}>
    <div className={styles.outletTop}>
      <Image src="/assets/stoqo/outlet.png" alt="" width={26} height={26} />
      {checked ? (
        <Pill tone="green">SUDAH DICEK</Pill>
      ) : (
        <Pill>BELUM DICEK</Pill>
      )}
    </div>
    <div style={{ padding: "8px 0" }}>
      <div className={styles.outletName}>{name}</div>
      <div className={`${styles.small} ${styles.outletSku}`}>{sku}</div>
    </div>
    <div className={checked ? styles.ctaGhost : styles.cta}>
      {checked ? "Lihat Detail" : "Mulai Check Order"}
    </div>
  </div>
);

const OrderList = () => (
  <Phone caption="02 · ORDER LIST PER RIDE">
    <div className={styles.rideHead}>
      <div className={styles.rideTitle}>
        <div>
          <div style={{ color: "#606060", whiteSpace: "nowrap" }}>
            MH-TEST1 - Tangkot 1
          </div>
          <div className={styles.bold}>F10R1</div>
        </div>
        <Pill tone="yellow">SEDANG DIKERJAKAN</Pill>
      </div>
      <div className={styles.rideCells}>
        <div>
          <div style={{ color: "#606060" }}>Out. Gate</div>
          <div className={styles.bold}>B2</div>
        </div>
        <span />
        <div>
          <div style={{ color: "#606060" }}>Sudah Dicek</div>
          <div className={styles.bold}>1 dari 4 Order</div>
        </div>
      </div>
    </div>
    <div className={styles.phoneBody}>
      <Outlet name="Warung Bu Tini" sku="9 Jenis SKU" />
      <Outlet name="Toko Sari Rasa" sku="7 Jenis SKU" checked />
    </div>
    <div className={styles.phoneFoot}>
      <div>
        <div className={styles.bold}>1/4 Order</div>
        <div style={{ color: "#606060" }}>Sudah dicek</div>
      </div>
      <div>
        <div className={styles.ctaOff}>Selesai Checklist</div>
      </div>
    </div>
  </Phone>
);

const Sku = ({
  name,
  unit,
  qty,
  marks,
  children,
}: {
  name: string;
  unit: string;
  qty: number;
  marks: ReactNode;
  children?: ReactNode;
}) => (
  <div className={styles.pCard} style={{ gap: 0 }}>
    <div className={styles.skuRow}>
      <div className={styles.skuInfo}>
        <span aria-hidden="true" className={styles.skuThumb} />
        <div className={styles.skuLines}>
          <span className={styles.bold}>{name}</span>
          <span>{unit}</span>
          <span className={styles.qty}>
            Ambil: <span>{qty}</span>
          </span>
        </div>
      </div>
      <div className={styles.marks}>{marks}</div>
    </div>
    {children}
  </div>
);

const SkuChecking = () => (
  <Phone caption="03 · SKU CHECKING">
    <div className={styles.rideHead}>
      <div className={styles.rideTitle}>
        <div>
          <div style={{ color: "#606060", whiteSpace: "nowrap" }}>
            MH-TEST1 - Tangkot 1 • F10R1
          </div>
          <div className={styles.bold}>Warung Bu Tini</div>
        </div>
        <Pill>BELUM DICEK</Pill>
      </div>
      <div className={styles.skuCount}>
        <span style={{ color: "#606060" }}>Jumlah SKU:</span>
        <span className={styles.bold}>9 Jenis</span>
      </div>
    </div>
    <div className={styles.phoneBody} style={{ gap: 12 }}>
      <p className={styles.hint}>
        Jika SKU sesuai, beri tanda centang. Bila tidak sesuai, beri tanda
        silang dan pilih keterangan.
      </p>
      <Sku
        name="SOSRO Teh Celup"
        unit="350 g/pak"
        qty={4}
        marks={
          <>
            <Mark src="/assets/stoqo/reject.png" />
            <span className={styles.swap}>
              <span className={styles.swapOff}>
                <Mark src="/assets/stoqo/accept.png" />
              </span>
              <span className={styles.swapOn}>
                <Mark src="/assets/stoqo/accepted.png" />
              </span>
            </span>
          </>
        }
      />
      <Sku
        name="SANIA Minyak Goreng"
        unit="2 ltr/kantong"
        qty={3}
        marks={
          <>
            <Mark src="/assets/stoqo/rejected.png" />
            <Mark src="/assets/stoqo/accept.png" />
          </>
        }
      >
        <div className={styles.reason}>
          <div style={{ color: "#606060" }}>Alasan</div>
          <div className={styles.reasonSelect}>
            SKU Kurang{" "}
            <span aria-hidden="true" className={styles.caret}>
              ▼
            </span>
          </div>
        </div>
      </Sku>
    </div>
    <div className={styles.phoneFoot}>
      <div>
        <div className={`${styles.bold} ${styles.swap}`}>
          <span className={styles.swapOff}>7/9 SKU</span>
          <span className={styles.swapOn}>8/9 SKU</span>
        </div>
        <div style={{ color: "#606060" }}>Sudah dicek</div>
      </div>
      <div>
        <div className={styles.ctaOff}>Simpan Hasil Checking</div>
      </div>
    </div>
  </Phone>
);

/** STOQO — the warehouse Digital Checking List, as three handheld screens. */
const StoqoChecklist = () => (
  <div className={styles.stoqo}>
    <p className={styles.stoqoIntro}>
      A checker picks up a ride, works its orders one by one, and accepts or
      rejects every SKU against what the picker staged. Rejected lines become
      rescue tasks, so nothing leaves the gate unverified.
    </p>
    <div className={styles.phonesScroll}>
      <div className={styles.phonesBox}>
        <div className={styles.phones} aria-hidden="true">
          <TaskList />
          <OrderList />
          <SkuChecking />
        </div>
      </div>
    </div>
    <div className={styles.manpower}>
      <div className={styles.manpowerLabel}>Manpower needed per shift</div>
      <div className={styles.manpowerTrack} aria-hidden="true">
        <div className={styles.manpowerBar} />
      </div>
      <p className={styles.manpowerNote}>
        Up to 70% less headcount, 30% better efficiency.
      </p>
    </div>
  </div>
);

export default StoqoChecklist;
