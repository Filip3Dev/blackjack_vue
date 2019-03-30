<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 text-center">
        <div>
          <h5 class="q-mt-sm q-mb-sm">
            Já ouviu falar de BlackJack?
            <br>
            O famoso forma jogo
          </h5>
          <h4 class="q-mt-sm q-mb-sm">
            <b>
              Jogue agora !
            </b>
          </h4>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 text-center">
        <img src="https://clientarea.netent.com/wp-content/uploads/cdn/3e106d9d8460c2ebf2c4fe1b0a05b02a/01_logo_blackjack_black_blackjackhtml5.png" alt="" class="homeImg">
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 text-center q-mt-lg">
        <transition name="custom-classes-transition" enter-active-class="animated tada" leave-active-class="animated bounceOutRight">
          <q-btn label="Iniciar Desafio"
          @click="startChallenge()"
          class="primaryButton size-3 animater"
          :loading="loading" />
        </transition>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>
<style lang="sass" scoped src="../statics/home.sass"></style>


<script>
import api from '../services/api_service';
export default {
  name: 'PageIndex',
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    startChallenge() {
      this.loading = true
      setTimeout(() => {
        this.$router.push('/game')
      }, 1000)
    },
    async getLocation() {
      try {
        const response =  await api.userLocation()
        if (response.status === 200) {
          console.log(response.data);

        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getLocation()
  },
}
</script>
