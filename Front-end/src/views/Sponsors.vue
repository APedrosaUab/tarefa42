<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Sponsors" />

      <!-- Portfolio Grid Items -->
      <b-row>
        <!--FILTRO-->

        <div class="form-group mb-5">
          <input
            class="form-control form-control-lg"
            type="text"
            placeholder="procura pelo nome..."
            v-model="filterName"
          />
        </div>
        <div class="form-group mx-sm-3 mb-5">
          <select class="form-control form-control-lg" v-model="filterGroup">
            <option value="todos">todos os grupos</option>
            <option value="anfíbio">anfíbios</option>
            <option value="ave">aves</option>
            <option value="mamífero">mamíferos</option>
            <option value="peixe">peixes</option>
            <option value="réptil">répteis</option>
          </select>
        </div>
        <div class="form-group mx-sm-3 mb-5">
          <select class="form-control form-control-lg" v-model="filterLevel">
            <option value="todos">todos os níveis</option>
            <option value="1">nível 1</option>
            <option value="2">nível 2</option>
            <option value="3">nível 3</option>
            <option value="4">nível 4</option>
            <option value="5">nível 5</option>
          </select>
        </div>
        <div class="form-group mb-5">
          <button class="btn btn-success btn-lg" @click="sortSponsors">
            <i :class="classSorter"></i> ordenar
          </button>
        </div>
      </b-row>
      <div class="row">
        <Sponsor
          v-for="a in filteredSponsors"
          :key="a.id"
          :sponsor="a"
        ></Sponsor>
      </div>
    </b-container>
  </section>
</template>

<script>
import Sponsor from "@/components/Sponsor.vue";
import HeaderPage from "@/components/HeaderPage.vue";
import { FETCH_SPONSORS } from "@/store/sponsors/sponsor.constants";

import { mapGetters } from "vuex";

export default {
  name: "Sponsors",
  components: {
    HeaderPage,
    Sponsor
  },
  data: function() {
    return {
      filterName: "",
      filterGroup: "todos",
      filterLevel: "todos",
      reverse: false,
      sponsors: [],
      userLevel: 0
    };
  },
  computed: {
    ...mapGetters(["getUserLevelByPoints"]),
    ...mapGetters("auth", ["getProfile"]),
    ...mapGetters("sponsor", ["getSponsors", "getMessage"]),
    classSorter() {
      return {
        "fas fa-sort-alpha-up": !this.reverse,
        "fas fa-sort-alpha-down": this.reverse
      };
    },
    filteredSponsors() {
      return this.sponsors.filter(sponsor => {
        let filterNameResult = true,
          filterGroupResult = true,
          filterLevelResult = true;
        if (this.filterName != "") {
          filterNameResult = sponsor.name.includes(this.filterName);
        }
        if (this.filterName != "") {
          filterNameResult = sponsor.name.includes(this.filterName);
        }
        if (this.filterGroup != "todos") {
          filterGroupResult = sponsor.group == this.filterGroup;
        }
        if (this.filterLevel != "todos") {
          filterLevelResult = sponsor.level == this.filterLevel;
        }
        return filterNameResult && filterGroupResult && filterLevelResult;
      });
    }
  },
  methods: {
    compareSponsorNames(sponsor1, sponsor2) {
      if (!this.reverse) {
        if (sponsor1.name > sponsor2.name) return 1;
        if (sponsor1.name < sponsor2.name) return -1;
      } else {
        if (sponsor1.name < sponsor2.name) return 1;
        if (sponsor1.name > sponsor2.name) return -1;
      }
      return 0;
    },
    sortSponsors() {
      this.sponsors.sort(this.compareSponsorNames);
      this.reverse = !this.reverse;
    }
  },
  created() {
    this.$store.dispatch(`sponsor/${FETCH_SPONSORS}`).then(
      () => {
        this.sponsors = this.getSponsors.filter(
          sponsor =>
            sponsor.level <=
            this.getUserLevelByPoints(this.getProfile.gamification.points).level
        );
      },
      err => this.$alert(`${err.message}`, "Erro", "error")
    );
  }
};
</script>
