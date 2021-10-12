import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const DIRECTION_NAMES = [
  "Norte",
  "Noroeste",
  "Este",
  "Sureste",
  "Sur",
  "Suroeste",
  "Oeste",
  "Noroeste",
];

/**
 * @param {number} direction
 */
const directionName = (direction) => {
  const sections = DIRECTION_NAMES.length;
  const sector = 360 / sections;
  let pos = Math.floor((direction + sector / 2) / sector);
  pos = pos >= sections ? 0 : pos;
  return DIRECTION_NAMES[pos];
};

/**
 * @param {number} oldAngle
 * @param {number} direction
 */
const normalizeAngle = (oldAngle, direction) => {
  let newAngle = direction,
    rot = oldAngle || 0,
    ar = rot % 360;

  while (newAngle < 0) {
    newAngle += 360;
  }
  while (newAngle > 360) {
    newAngle -= 360;
  }
  while (rot < 0) {
    rot += 360;
  }
  while (rot > 360) {
    rot -= 360;
  }

  if (ar < 0) {
    ar += 360;
  }
  if (ar < 180 && newAngle > ar + 180) {
    rot -= 360;
  }
  if (ar >= 180 && newAngle <= ar - 180) {
    rot += 360;
  }

  rot += newAngle - ar;

  return rot;
};

/**
 * @param {{ direction: number }} props
 */
export const Compass = ({ direction }) => {
  const [angle, setAngle] = useState(0);
  const [dirName, setDirName] = useState("");

  useEffect(() => {
    const dir = normalizeAngle(angle, direction);
    const dirName = directionName(dir);
    setAngle(dir);
    setDirName(dirName);
  }, [direction]);

  return (
    <div className={styles.compass}>
      <div
        className={styles.compass_windrose}
        style={{
          transform: `rotate(-${direction}deg)`,
        }}
      >
        <div className={styles.compass_mark} />
        <div className={styles.compass_mark} />
        <div className={styles.compass_mark} />
        <div className={styles.compass_mark} />
        <div className={styles.compass_mark} />
        <div className={styles.compass_mark} />
        <div className={styles.compass_mark} />
        <div className={styles.compass_mark} />
        <div className={styles.compass_mark} />
        <div className={styles.compass_mark} />

        <div className={styles.compass_mark_direction_h} />
        <div className={styles.compass_mark_direction_v} />
      </div>

      <div className={styles.compass_arrow_container}>
        <div className={styles.compass_arrow} />
        <div className={styles.compass_labels}>
          <span>{dirName}</span>
          <span>
            {angle}
            <sup>o</sup>
          </span>
        </div>
      </div>
    </div>
  );
};
