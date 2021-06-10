<template>
  <div id="app">
    <Header/>
    <SearchForm v-on:search="search"/>
    <SearchResults
      v-if="videos.length > 0"
      v-bind:videos="videos"
      v-bind:reformattedSearchString="reformattedSearchString"
    />
  </div>
</template>

<script>

import Header from './components/layout/Header';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import { getVideos } from './services/VideoService';

export default {
  name: 'App',
  components: {
    Header,
    SearchForm,
    SearchResults,
  },
  data() {
    return {
      videos: [],
      reformattedSearchString: '',
      query: '',
    };
  },
  methods: {
    search(searchParams) {
      this.reformattedSearchString = searchParams.join(' ');
      this.query = searchParams.join('+');
      this.getData(this.query);
    },

    getData(query) {
      getVideos(query)
        .then(res => {
          this.videos = res.data.items;
        }).catch( error =>  console.log(error));
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
