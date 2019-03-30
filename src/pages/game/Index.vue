<template>
  <q-page class="flex flex-center">
    <div class="hardSection">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 text-center">
          <div class="dealerHands">
            <div v-for="(x, i) in dealer_hand" :key="i" class="dealer">
              <transition appear enter-active-class="animated flipInX" leave-active-class="animated flip">
                <!-- <img src="statics/back_card.png" alt="" class="mydealerCard"> -->
                <img :src="x.image" alt="" class="mydealerCard">
              </transition>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 text-center">
          <img src="statics/desk.png" alt="" class="mydesk">
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 text-center">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4 text-center">
              <p>
                Pontos
                {{calcHandUser}}
              </p>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 text-center">
              <div class="dealerHands">
                <div v-for="(x, i) in user_hand" :key="i">
                  <transition appear enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
                    <img :src="x.image" alt="" class="mydealerCard">
                  </transition>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 text-center">
              <div class="latestButtons">
                <div class="row gutter-sm">
                  <div class="col-xs-12 col-sm-12 col-md-6 text-center">
                    <q-btn label="Nova Carta"
                    class="specialButton callButton" @click="userGetNewCard" :loading="loading_callButton"/>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-6 text-center">
                    <q-btn label="Aguardar"
                    class="specialButton standButton" @click="userStand" :loading="loading_standButton"/>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-4 text-center">
                    <q-btn label="Dobrar Aposta" class="specialButton doubleButton"/>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-4 text-center">
                    <q-btn label="Apostar R$ 1" class="specialButton moreButton"/>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-4 text-center">
                    <q-btn label="Apostar R$ 5" class="specialButton fiveButton"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="relativoAtudo">
            <div class="dealerHands">
              <div v-for="(x, i) in user_hand" :key="i">
                <transition appear enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
                  <img :src="x.image" alt="" class="mydealerCard">
                </transition>
              </div>
            </div>
            <div class="latestButtons">
              <div class="row gutter-sm">
                <div class="col-xs-12 col-sm-12 col-md-6 text-center">
                  <q-btn label="Nova Carta"
                  class="specialButton callButton" @click="userGetNewCard" :loading="loading_callButton"/>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 text-center">
                  <q-btn label="Aguardar"
                  class="specialButton standButton" @click="userStand" :loading="loading_standButton"/>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 text-center">
                  <q-btn label="Dobrar Aposta" class="specialButton doubleButton"/>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 text-center">
                  <q-btn label="Apostar R$ 1" class="specialButton moreButton"/>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 text-center">
                  <q-btn label="Apostar R$ 5" class="specialButton fiveButton"/>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import api from '../../services/api_service';
export default {
  name: 'indexGame',
  data () {
    return {
      userWin: 0,
      dealerWin: 0,
      leftDrawer: true,
      deck_id: null,
      cards_list: null,
      dealer_hand: null,
      user_hand: null,
      loading_callButton: false,
      loading_standButton: false
    }
  },
  created() {
    this.initialMetod()
  },
  methods: {
    async initialMetod() {
      this.dealer_hand = null;
      this.user_hand = null;
      this.loading_callButton = false;
      this.loading_standButton = false;
      try {
        const response =  await api.getInitialData()
        if (response.status === 200) {
          this.deck_id = response.data.deck_id;
          this.getDrawData()
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getDrawData() {
      try {
        const response =  await api.getDrawData(this.deck_id)
        if (response.status === 200) {
          let lista = response.data.cards;
          this.cards_list  = lista.map(function(iten) {
            if (iten.value == "KING" || iten.value == "QUEEN" || iten.value == "JACK"){
              iten.name = iten.value;
              iten.value = 10;
            }
            if (iten.value == "ACE"){
              iten.name = iten.value;
              iten.value = 11;
            }
            return iten;
          });
          this.getUserCards()
          this.getDealerCards()
        }
      } catch (error) {
        console.log(error);
      }
    },
    getUserCards() {
      if (this.user_hand == null) {
        this.user_hand = []
      }
      const card1 = this.cards_list[Math.floor(Math.random()*this.cards_list.length)];
      let index1 = this.cards_list.indexOf(card1);
      this.cards_list.splice(index1,1);
      this.user_hand.push(card1);
      if (this.user_hand.length < 2) {
        setTimeout(() => {
          this.getUserCards()
        }, 1000)
      }
    },
    getDealerCards() {
      if (this.dealer_hand == null) {
        this.dealer_hand = []
      }
      const card1 = this.cards_list[Math.floor(Math.random()*this.cards_list.length)];
      let index1 = this.cards_list.indexOf(card1);
      this.cards_list.splice(index1,1);
      this.dealer_hand.push(card1);
      if (this.dealer_hand.length < 2) {
        setTimeout(() => {
          this.getDealerCards()
        }, 1500)
      }
    },
    endRow(){
      this.loading_callButton = true
      this.loading_standButton = true
      setTimeout(() => {
        this.initialMetod()
      }, 2000)
    },
    checkState(){
      let dealer_hand_value = this.calcHandDealer;
      let user_hand_value = this.calcHandUser;
      if (user_hand_value > 21 || dealer_hand_value > 21){
        if (user_hand_value > dealer_hand_value) {
          this.userWin += 1
          return this.endRow();
        }
        if (user_hand_value < dealer_hand_value) {
          this.dealerWin += 1
          return this.endRow();
        }
      }
      this.loading_callButton = false
    },
    userGetNewCard() {
      this.loading_callButton = true
      if (this.user_hand == null) {
        this.user_hand = []
      }
      setTimeout(() => {
        const card1 = this.cards_list[Math.floor(Math.random()*this.cards_list.length)];
        let index1 = this.cards_list.indexOf(card1);
        this.cards_list.splice(index1,1);
        this.user_hand.push(card1);
        this.checkState()
      }, 800)
    },
    userStand() {
      this.loading_standButton = true
      if (this.dealer_hand == null) {
        this.dealer_hand = []
      }
      let dealer_hand_value = this.calcHandDealer;
      let user_hand_value = this.calcHandUser;
      if (dealer_hand_value > 21 ) {
        return this.$notify({
          group: 'foo',
          title: 'Espocou!',
          text: 'O Dealer quebrou a banca!',
          type: 'warn'
        });
        setTimeout(() => {
          this.loading_standButton = false
        }, 800)
      }
      if(dealer_hand_value < user_hand_value && dealer_hand_value < 17){
        setTimeout(() => {
          const card1 = this.cards_list[Math.floor(Math.random()*this.cards_list.length)];
          let index1 = this.cards_list.indexOf(card1);
          this.cards_list.splice(index1,1);
          this.dealer_hand.push(card1);
          setTimeout(() => {
            this.loading_standButton = false
          }, 800)
        }, 800)
        return 0;
      }
      this.$notify({
        group: 'foo',
        title: 'Parei!',
        text: 'Hello user! This is a notification!'
      });
      setTimeout(() => {
        this.loading_standButton = false
      }, 800)
    },

  },
  computed: {
    calcHandUser(){
      try {
        let soma_total = this.user_hand.reduce( function( prevVal, elem ) {
          return parseInt(prevVal) + parseInt(elem.value);
        }, 0 );
        let count_lista = this.user_hand.map( elem =>  parseInt(elem.value) );
        if (count_lista.length > 2) {
          if (count_lista.includes(11)) {
            if (soma_total >= 20) {
              soma_total = soma_total - 10
            }
          }
        }
        return soma_total;
      } catch (error) { }
    },
    calcHandDealer(){
      try {
        let soma_total = this.dealer_hand.reduce( function( prevVal, elem ) {
          return parseInt(prevVal) + parseInt(elem.value);
        }, 0 );
        let count_lista = this.dealer_hand.map( elem =>  parseInt(elem.value) );
        if (count_lista.length > 2) {
          if (count_lista.includes(11)) {
            if (soma_total >= 20) {
              soma_total = soma_total - 10
            }
          }
        }
        return soma_total;
      } catch (error) { }
    }
  },
}
</script>

<style lang="sass" scoped src="../../statics/game.sass"></style>
