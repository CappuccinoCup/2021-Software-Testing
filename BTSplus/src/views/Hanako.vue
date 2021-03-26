<template>
  <v-app id="hanako" :class="app.backgroundStyle">
    <v-content>
      <v-container fluid class="mt-n5">
        <v-row align="center" justify="center">
          <v-col cols="12" md="10">
            <v-col cols="12">
              <v-card :color="app.whiteOpacity" class="pa-2">
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="mt-2">
                      <v-img src="../assets/Hanako.jpg"></v-img>
                    </div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-card-title class="display-1 font-weight-bold font-italic">
                      <v-spacer></v-spacer>
                      Toilet-Bound Hanako-kun
                    </v-card-title>
                    <v-card-title class="headline mt-n2 mb-2">
                      <v-spacer></v-spacer>
                      地縛少年花子くん
                    </v-card-title>
                    <v-card-text class="body-2">
                      <span class="font-italic font-weight-bold">Toilet-Bound Hanako-kun</span> is a Japanese manga
                      series by Iro Aida. It has been serialized in Square Enix's <span class="font-italic">shōnen</span>
                      manga magazine <span class="font-italic">Monthly G Fantasy</span> since 2014. It has been collected
                      in twelve <span class="font-italic">tankōbon</span> volumes. The manga is licensed in North America
                      by Yen Press. An anime television series adaptation by Lerche premiered on January 9, 2020.
                    </v-card-text>
                    <v-card-text class="body-2">
                      <div class="title">
                        Plot:
                      </div>
                      <div class="body-2">
                        Kamome Academy is known for its famous Seven Mysteries and supernatural occurrences, popularized
                        by student rumors. <br><br>Nene Yashiro, a first-year occult-loving student who yearns for a
                        boyfriend, decides to summon the seventh mystery "Hanako-san of the Toilet", a girl who died in
                        the bathroom a long time ago and can grant wishes for the right price. <br><br>However, upon
                        summoning the ghost, Hanako-san is revealed to be a boy. With a turn of events, Nene becomes his
                        assistant and the story follows their adventures in maintaining the balance between the spirit
                        world and the human world, as well as her discovery of the many secrets revolving around a
                        loser...
                      </div>
                    </v-card-text>
                    <v-card-text>
                      <div class="title">Main characters:</div>
                      <div class="subtitle-2">
                        <span style="color: #613739">Hanako-kun (花子くん)<br></span>
                        <span style="color: #e4bfb7">Nene Yashiro (八尋 寧々, <span class="font-italic">Yashiro Nene</span>)<br></span>
                        <span style="color: #f0a031">Kou Minamoto (源 光, <span class="font-italic">Minamoto Kō</span>)</span>
                      </div>
                    </v-card-text>
                    <v-row class="ma-3">
                      <v-spacer></v-spacer>
                      <a @click="openLink('https://www.tbs.co.jp/anime/hanakokun/')">
                        Anime official website
                      </a>
                    </v-row>
                    <v-row class="ma-3">
                      <v-spacer></v-spacer>
                      <a @click="openLink('https://www.bilibili.com/bangumi/media/md28224120')">
                        Domestic web broadcast
                      </a>
                    </v-row>
                    <v-row class="caption font-weight-light" align="center" justify="center">
                      <v-col cols="11">
                        <v-row>
                          Everyday animation recommend @CappuccinoCup
                          <v-spacer></v-spacer>
                          <a @click="back" style="opacity: 0">Back</a>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'Hanako',
    data() {
      return {
        app: this.$root.$children[0]
      }
    },
    methods: {
      openLink(url) {
        window.open(url);
      },
      back() {
        this.$router.replace({path: '/'});
      }
    }
  }
</script>

<style>
  .lightBg {
    background: url("/img/light_bg.jpg") center fixed !important;
  }

  .darkBg {
    background: url("/img/dark_bg.jpg") center fixed !important;
  }
</style>
