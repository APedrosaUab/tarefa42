<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Experts" />

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
          <button class="btn btn-success btn-lg" @click="sortExperts">
            <i :class="classSorter"></i> ordenar
          </button>
        </div>
      </b-row>
      <div class="row">
        <Expert v-for="a in filteredExperts" :key="a.id" :expert="a"></Expert>
      </div>
    </b-container>
  </section>
</template>

<script>
import Expert from "@/components/Expert.vue";
import HeaderPage from "@/components/HeaderPage.vue";
import { FETCH_EXPERTS } from "@/store/experts/expert.constants";

import { mapGetters } from "vuex";

export default {
  name: "Experts",
  components: {
    HeaderPage,
    Expert
  },
  data: function() {
    return {
      filterName: "",
      filterGroup: "todos",
      filterLevel: "todos",
      reverse: false,
      experts: [],
      userLevel: 0
    };
  },
  computed: {
    ...mapGetters(["getUserLevelByPoints"]),
    ...mapGetters("auth", ["getProfile"]),
    ...mapGetters("expert", ["getExperts", "getMessage"]),
    classSorter() {
      return {
        "fas fa-sort-alpha-up": !this.reverse,
        "fas fa-sort-alpha-down": this.reverse
      };
    },
    filteredExperts() {
      return this.experts.filter(expert => {
        let filterNameResult = true,
          filterGroupResult = true,
          filterLevelResult = true;
        if (this.filterName != "") {
          filterNameResult = expert.name.includes(this.filterName);
        }
        if (this.filterName != "") {
          filterNameResult = expert.name.includes(this.filterName);
        }
        if (this.filterGroup != "todos") {
          filterGroupResult = expert.group == this.filterGroup;
        }
        if (this.filterLevel != "todos") {
          filterLevelResult = expert.level == this.filterLevel;
        }
        return filterNameResult && filterGroupResult && filterLevelResult;
      });
    }
  },
  methods: {
    compareExpertNames(expert1, expert2) {
      if (!this.reverse) {
        if (expert1.name > expert2.name) return 1;
        if (expert1.name < expert2.name) return -1;
      } else {
        if (expert1.name < expert2.name) return 1;
        if (expert1.name > expert2.name) return -1;
      }
      return 0;
    },
    sortExperts() {
      this.experts.sort(this.compareExpertNames);
      this.reverse = !this.reverse;
    }
  },
  created() {
    this.$store.dispatch(`expert/${FETCH_EXPERTS}`).then(
      () => {
        this.experts = this.getExperts.filter(
          expert =>
            expert.level <=
            this.getUserLevelByPoints(this.getProfile.gamification.points).level
        );
      },
      err => this.$alert(`${err.message}`, "Erro", "error")
    );
  }
};
</script>
