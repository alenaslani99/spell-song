export default {
  getGenres(state) {
    return state.genres;
  },
  getSongs(state) {
    return state.songs;
  },
  getOneSong: (state) => (payload) => {
    if (state.songs.find((x) => x.id == payload)) {
      return state.songs.find((x) => x.id == payload);
    } else {
      return null;
    }
  },
};
