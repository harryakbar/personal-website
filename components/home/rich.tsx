import styles from "./home.module.css";

/** Renders copy where **double-asterisk** segments are bold (see lib/home.ts). */
const Rich = ({ text }: { text: string }) => (
  <>
    {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className={styles.strong}>
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      ),
    )}
  </>
);

export default Rich;
