<template>
  <v-app id="madoka" :class="app.backgroundStyle">
    <v-main>
      <v-container fluid class="mt-n5">
        <v-row align="center" justify="center">
          <v-col cols="12" md="10">
            <v-col cols="12">
              <v-img src="../assets/MadokaCharacters.jpg"></v-img>
            </v-col>
            <v-col cols="12">
              <v-card :color="app.whiteOpacity" class="pa-2">
                <v-card-title class="display-2 font-italic">
                  Puella Magi Madoka Magica
                </v-card-title>
                <v-card-title class="headline mt-n2">
                  魔法少女まどか☆マギカ
                </v-card-title>
                <v-row>
                  <v-col cols="12" md="7">
                    <v-card-text class="body-2">
                      <span class="font-italic font-weight-bold">Puella Magi Madoka Magica</span>, often referred to
                      simply as <span class="font-italic font-weight-bold">Madoka Magica</span>, is created by Magica
                      Quartet, an artist collective consisting of director Akiyuki Shinbo(新房 昭之), screenwriter Gen
                      Urobuchi(虚淵 玄), character designer Ume Aoki(蒼樹 うめ), and producer Atsuhiro Iwakami.<br><br>The
                      series garnered a variety of awards, such as the Television Award at the 16th Animation Kobe
                      Awards, as well as 12 <span class="font-italic">Newtype</span> Anime Awards and the Grand Prize
                      for animation in the 2011 Japan Media Arts awards.
                    </v-card-text>
                    <v-card-text>
                      <div class="title">Plot:</div>
                      <div class="body-2">In the fictional city of Mitakihara, Japan, a middle school student named
                        Madoka Kaname and her friend Sayaka Miki encounter a small, cat-like creature named Kyubey. It
                        offers a contract in which a girl may have any wish granted in exchange for obtaining magical
                        powers and being tasked with fighting witches. Meanwhile, a transfer student and magical girl
                        named Homura Akemi tries to stop Madoka from making the contract with Kyubey......<br><br>"I
                        swear I'll save you! I'll do whatever it takes to keep you safe. I'll come back again and again
                        and again. I'll save you! I swear!"
                      </div>
                    </v-card-text>
                    <v-card-text>
                      <div class="title">Main characters:</div>
                      <div class="subtitle-2 font-weight-regular">
                        <span style="color: #f2b1b9">Madoka Kaname(鹿目 まどか, <span class="font-italic">Kaname Madoka</span>)<br></span>
                        <span style="color: #3c3c3e">Homura Akemi(暁美 ほむら, <span class="font-italic">Akemi Homura</span>)<br></span>
                        <span style="color: #f7d456">Mami Tomoe(巴 マミ, <span class="font-italic">Tomoe Mami</span>)<br></span>
                        <span style="color: #74a3b3">Sayaka Miki(美樹 さやか, <span class="font-italic">Miki Sayaka</span>)<br></span>
                        <span style="color: #bb6274">Kyoko Sakura(佐倉 杏子, <span class="font-italic">Sakura Kyōko</span>)<br></span>
                      </div>
                    </v-card-text>
                    <v-row class="ma-2">
                      <v-spacer></v-spacer>
                      <a @click="openLink('https://www.madoka-magica.com/')">
                        Anime official website
                      </a>
                    </v-row>
                    <v-row class="ma-2">
                      <v-spacer></v-spacer>
                      <a @click="openLink('https://www.bilibili.com/bangumi/media/md2539/')">
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
                  <v-col cols="12" md="5">
                    <div class="mt-2">
                      <v-img src="../assets/MadokaTheMovie.jpg"></v-img>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'Madoka',
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
