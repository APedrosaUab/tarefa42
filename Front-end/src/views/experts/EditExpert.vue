<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Especialista" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <div class="form-group">
              <input
                v-model="expert.name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve nome do especialista"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="expert.animal"
                type="text"
                class="form-control form-control-lg"
                id="txtAnimal"
                placeholder="escreve nome do animal"
                required
              />
            </div>
            <div class="form-group">
              <select
                id="sltGroup"
                class="form-control form-control-lg"
                v-model="expert.group"
                required
              >
                <option value>-- SELECIONA GRUPO --</option>
                <option value="anfibio">ANFÍBIO</option>
                <option value="ave">AVE</option>
                <option value="mamifero">MAMÍFERO</option>
                <option value="peixe">PEIXE</option>
                <option value="reptil">RÉPTIL</option>
              </select>
            </div>
            <div class="form-group">
              <input
                v-model="expert.years_experience"
                type="number"
                class="form-control form-control-lg"
                id="yearsExperted"
                placeholder="Quantos anos de patrocínio"
                required
              />
            </div>
            <div class="form-group">
              <textarea
                id="txtDescription"
                class="form-control form-control-lg"
                placeholder="escreve descrição"
                cols="30"
                rows="10"
                v-model="expert.description"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <input
                v-model="expert.location.city"
                type="text"
                class="form-control form-control-lg"
                id="txtCity"
                placeholder="escreve cidade"
                required
              />
            </div>
            <div class="form-group">
              <input
                v-model="expert.location.country"
                type="text"
                class="form-control form-control-lg"
                id="txtCountry"
                placeholder="escreve país"
                required
              />
            </div>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-edit"></i> ATUALIZAR
            </button>
            <router-link
              :to="{ name: 'listExperts' }"
              tag="button"
              class="btn btn-outline-danger btn-lg"
              ><i class="fas fa-window-close"></i> CANCELAR</router-link
            >
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { EDIT_EXPERT } from "@/store/experts/expert.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditExpert",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      expert: {},
    };
  },
  computed: {
    ...mapGetters("expert", ["getExpertsById", "getMessage"])
  },
  methods: {
    update() {
      this.$store.dispatch(`expert/${EDIT_EXPERT}`, this.$data.expert).then(
        () => {
          this.$alert(this.getMessage, "Especialista atualizado!", "success");
          router.push({ name: "listExperts" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.expert = this.getExpertsById(this.$route.params.expertId);
  }
};
</script>
