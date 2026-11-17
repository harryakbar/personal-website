import styles from "./diagrams.module.css";

const BACKLOG = [
  { name: "Toko Eko", meta: "ID 1234567 · 300 kg · 10 CBM", drag: true },
  { name: "Toko Fahmi", meta: "ID 1234568 · 200 kg · 2 CBM" },
  { name: "Toko Ginanjar", meta: "ID 1234569 · 300 kg · 10 CBM" },
];

const Stop = ({
  pin,
  name,
  meta,
  pinTone,
}: {
  pin: string;
  name: string;
  meta: [string, string];
  pinTone?: "blue" | "amber";
}) => (
  <>
    <div className={styles.tmsStopHead}>
      <span className={styles.tmsPin} data-tone={pinTone}>
        {pin}
      </span>
      <span>{name}</span>
    </div>
    <div className={styles.tmsStopMeta}>
      {meta[0]}
      <br />
      {meta[1]}
    </div>
  </>
);

/** GudangAda — Transport Management System: drag a delivery into a driver's route. */
const TmsRoute = () => (
  <div className={`${styles.frame} ${styles.tmsFrame} ${styles.scrollX}`}>
    <div
      role="img"
      aria-label="Transport Management System: a delivery card being dragged from the backlog into a driver's route, where a drop slot highlights and the stop is added in sequence"
      className={styles.tms}
    >
      <div className={styles.tmsRail}>
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className={styles.tmsBody}>
        <div className={styles.tmsTop}>
          <span>Backlog</span>
          <span>›</span>
          <span style={{ color: "#17181a", fontWeight: 700 }}>Route</span>
          <span className={styles.tmsDate}>14-03-2020</span>
          <span className={styles.tmsSave}>Save</span>
        </div>

        <div className={styles.tmsCols}>
          <div className={styles.tmsBatch}>
            <div className={styles.tmsLabel}>
              Assign to Batch <span className={styles.tmsMuted}>(7)</span>
            </div>
            <div className={styles.tmsCards}>
              {BACKLOG.map((card) => (
                <div
                  key={card.name}
                  className={styles.tmsCard}
                  data-drag={card.drag ? "true" : undefined}
                >
                  <div className={styles.tmsCardName}>{card.name}</div>
                  <div className={styles.tmsCardMeta}>{card.meta}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.tmsFleet}>
            <div className={styles.tmsFleetHead}>
              <span style={{ fontWeight: 700, color: "#17181a" }}>
                Routed Fleet
              </span>
              <span>(24)</span>
              <span className={styles.tmsSent}>8 routes sent</span>
              <span className={styles.tmsWarn}>4 warnings</span>
            </div>

            <div className={styles.tmsRoute}>
              <div className={styles.tmsDriver}>
                <span className={styles.tmsDriverBadge}>A</span>
                <span style={{ fontWeight: 600, color: "#17181a" }}>
                  AR01 · Agus Rahmadi
                </span>
                <span className={styles.mono} style={{ color: "#9ca3af" }}>
                  B 9940 DU
                </span>
                <span className={styles.mono} style={{ marginLeft: "auto" }}>
                  17/17 orders · 50,2 km
                </span>
              </div>
              <div className={styles.tmsStops}>
                <div className={styles.tmsStop} data-tone="teal">
                  <Stop
                    pin="A1"
                    name="Toko Anugrah"
                    meta={["07:00–18:00", "ETA 08.35"]}
                  />
                </div>
                <div className={styles.tmsStop}>
                  <Stop
                    pin="A2"
                    name="Toko Fahmi"
                    pinTone="blue"
                    meta={["07:00–18:00", "ETA 10.40"]}
                  />
                </div>
                <div className={`${styles.tmsStop} ${styles.tmsSlot}`}>
                  <div className={styles.tmsLanded}>
                    <Stop
                      pin="A3"
                      name="Toko Eko"
                      meta={["07:00–18:00", "ETA 12.05"]}
                    />
                  </div>
                </div>
                <div className={styles.tmsStop} data-tone="amber">
                  <Stop
                    pin="B1"
                    name="Toko Abdul"
                    pinTone="amber"
                    meta={["Kembali ke seller", "ETA 17.48"]}
                  />
                </div>
              </div>
            </div>

            <div className={styles.tmsFoot}>
              <span>Suggest Route »</span>
              <span className={styles.tmsEta}>Update ETA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const TmsFigures = () => (
  <>
    <div className={styles.tmsFigure}>
      <div className={styles.tmsFigureValue} data-pulse="true">
        45,000
      </div>
      <div className={styles.tmsFigureLabel}>deliveries / month</div>
    </div>
    <div className={styles.tmsFigure}>
      <div className={styles.tmsFigureValue}>456</div>
      <div className={styles.tmsFigureLabel}>drivers &amp; vehicles</div>
    </div>
  </>
);

export const tmsFooterClass = styles.tmsFooter;

export default TmsRoute;
