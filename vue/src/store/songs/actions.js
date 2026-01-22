import axios from "../../axios";
export default{
   async allGenres(context){
    const response = await axios.get("/genres");
    context.commit("setGenres",response.data);
   },
   async insertSong(_,payload){
      await axios.post("/songs",payload);
   },
   async allSongs(context){
      const response = await axios.get("/songs");
      context.commit("setSongs", response.data.songs);
   },
   async edit(_,payload){
      await axios.post("/edit",payload);
   },
   async deleteSong(_,payload){
      await axios.post("/delete/" + payload);
   },
   async buySongs(_,payload){
      await axios.post("/buy",payload);
   },
   async likeSong(_,payload){
      await axios.post("/like",payload);
   }
}