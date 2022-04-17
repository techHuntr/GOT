/**
 *
 * Normalize sizes for different screen densities
 *
 */

import { Dimensions } from "react-native";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 320;

const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
export const normalize = (size: number, factor = 1) =>
  size + (scale(size) - size) * factor;
