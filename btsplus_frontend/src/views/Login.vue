<template>
  <v-app id="login" :class="app.backgroundStyle">
    <v-main>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5">
            <v-card shaped :color="app.whiteOpacity" id="loginBase">
              <v-card-text>
                <v-toolbar flat color="rgba(255,255,255,0)">
                  <v-toolbar-title class="display-1">登录</v-toolbar-title>
                  <v-spacer/>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn icon large v-on="on" @click="openStart">
                        <v-icon>mdi-home-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>主页</span>
                  </v-tooltip>
                </v-toolbar>
                <v-form ref="form" class="ma-7 mb-n5">
                  <v-text-field v-model="username" label="username" append-icon="mdi-account"
                                ref="username" outlined
                                :rules="[() => !!username || 'username is required']"></v-text-field>
                  <v-text-field v-model="password" label="password" append-icon="mdi-fingerprint"
                                ref="password" outlined type="password" @keyup.enter="login"
                                :rules="[() => !!password || 'password is required']"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="mr-7">
                <v-spacer></v-spacer>
                <v-slide-x-reverse-transition>
                  <v-tooltip v-if="formHasErrors" left>
                    <template v-slot:activator="{ on }">
                      <v-btn icon class="my-0" @click="resetForm" v-on="on">
                        <v-icon>mdi-refresh</v-icon>
                      </v-btn>
                    </template>
                    <span>重置表单</span>
                  </v-tooltip>
                </v-slide-x-reverse-transition>
                <v-btn color="primary" text @click="login" class="title">确认</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        formHasErrors: false,
        app: this.$root.$children[0]
      }
    },
    computed: {
      form: function () {
        return {
          username: this.username,
          password: this.password
        }
      }
    },
    methods: {
      openStart: function () {
        this.$router.push({path: '/'});
      },
      resetForm() {
        this.formHasErrors = false;

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset();
        });
      },
      login() {
        if (this.app.overlay === true) {
          return;
        }

        this.formHasErrors = false;

        Object.keys(this.form).forEach(f => {
          this.$refs[f].validate(true);
          if (!this.$refs[f].valid) {
            this.formHasErrors = true;
          }
        });

        if (!this.formHasErrors) {
          this.app.overlay = true;
          this.$axios.post('/user/login', {
            username: this.username,
            password: this.password
          })
            .then(resp => {
              if (resp.data.code === 200) {
                // 保存 token 信息
                this.$store.commit('login', resp.data.data);

                // 获取用户信息
                this.$axios.get('/user/curr', {
                  params: {}
                })
                  .then(resp => {
                    if (resp.data.code === 200) {
                      this.$store.commit('userDetails', resp.data.data);
                      // 页面跳转
                      if (!this.$route.query.redirect) {
                        // 如果没有重定向参数时，跳转到主页
                        if (this.$store.state.userDetails.role === 2) {
                          this.$router.replace({path: '/admin'});
                        } else if (this.$store.state.userDetails.role === 1) {
                          this.$router.replace({path: '/teller'});
                        } else {
                          this.$router.replace({path: '/'});
                        }
                      } else {
                        this.$router.replace({path: this.$route.query.redirect}).catch(() => {
                          this.app.message('你真是个小调皮呢', 'warning');
                        })
                      }
                      this.app.message('登录成功', 'success');
                    } else {
                      this.app.message(resp.data.message, 'error');
                    }
                  })
                  .catch(() => {
                    this.app.message('获取用户信息失败', 'error');
                  });
                this.app.overlay = false;
              } else {
                this.app.message(resp.data.message, 'error');
                this.app.overlay = false;
              }
            })
            .catch(() => {
              this.app.message('登录失败', 'error');
              this.app.overlay = false;
            });
        }
      }
    },
    beforeRouteEnter: (to, from, next) => {
      // 如果在已登录情况下使用url进入登录界面，则将url转到 Start 页面
      next(vm => {
        if (vm.$store.state.token) {
          vm.$router.push('/');
          vm.app.message('请先退出登录', 'warning');
        }
      });
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

  #loginBase {
    margin-top: 100px;
  }
</style>
