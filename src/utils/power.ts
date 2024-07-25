export const getPowerValue = (lightValue: string, powerCoefficient: string): string => {
  const normalizedLightValue = lightValue.replace(/\./g, '').replace(',', '.');
  const power = parseFloat(lightValue) / parseFloat(powerCoefficient) * 1000;
  const valueOfPower = (Math.ceil(power * 100) / 100).toFixed(2);

  return valueOfPower;
}