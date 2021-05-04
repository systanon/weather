export function weatherIconLink(name, bigSize = false) {
  return `${process.env.VUE_APP_STATIC_HOST}/img/wn/${name}@${
    bigSize ? 4 : 2
  }x.png`;
}
