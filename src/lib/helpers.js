export function is_printable_ascii(value) {
  return value >= 31 && value <= 126;
}

export function val_to_color(value) {
  if (value === 0xff) {
    return '#ef5350';
  } else if (value === 0x00) {
    return 'rgba(0, 0, 0, 0.6)';
  } else if (is_printable_ascii(value)) {
    return '#42a5f5';
  } else {
    return '#000000';
  }
}
