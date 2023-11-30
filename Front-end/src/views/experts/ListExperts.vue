<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Especialistas" />

      <!--MENU TOPO-->
      <b-row class="mb-4">
        <b-col>
          <router-link
            :to="{ name: 'addExpert' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
            ><i class="fas fa-plus-square"></i> ADICIONAR
            ESPECIALISTA</router-link
          >
          <router-link
            :to="{ name: 'admin' }"
            tag="button"
            class="btn btn-outline-info mr-2 mt-2"
            ><i class="fas fa-bars"></i> MENU PRINCIPAL</router-link
          >
        </b-col>
      </b-row>

      <!-- TABELA -->
      <b-row>
        <b-col>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">
                  NOME
                  <i
                    class="fas fa-arrow-up"
                    v-if="sortType === 1"
                    @click="sort()"
                  ></i>
                  <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                </th>
                <th scope="col">ANIMAL / GRUPO</th>
                <th scope="col">ANOS</th>
                <th scope="col">LOCALIZAÇÃO</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="expert of experts" :key="expert._id">
                <td class="pt-4">{{ expert.name }}</td>
                <td class="pt-4">{{ expert.animal }} / {{ expert.group }}</td>
                <td class="pt-4">{{ expert.years_experience }}</td>
                <td class="pt-4">{{ expert.location.city }} / {{ expert.location.country }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'editExpert',
                      params: { expertId: expert._id }
                    }"
                    tag="button"
                    class="btn btn-outline-success mr-2"
                    ><i class="fas fa-edit"></i> EDITAR</router-link
                  >
                  <button
                    @click="viewExpert(expert._id)"
                    type="button"
                    class="btn btn-outline-success mr-2"
                  >
                    <i class="fas fa-search"></i> VER
                  </button>
                  <button
                    @click="removeExpert(expert._id)"
                    type="button"
                    class="btn btn-outline-danger mr-2 "
                  >
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_EXPERTS, REMOVE_EXPERT } from "@/store/experts/expert.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "ManageExperts",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      experts: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("expert", ["getExperts", "getMessage"])
  },
  methods: {
    fetchExperts() {
    this.$store.dispatch(`expert/${FETCH_EXPERTS}`).then(
      () => {
        this.experts = this.getExperts;
      },
      (err) => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    ).finally(() => {
      this.$store.commit('expert/CLEAR_MESSAGE');
    });
  },
    sort() {
      this.experts.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(u1, u2) {
      if (u1.name > u2.name) return 1 * this.sortType;
      else if (u1.name < u2.name) return -1 * this.sortType;
      else return 0;
    },

    viewExpert(id) {
      const expert = this.experts.find(expert => expert._id === id);
      this.$fire({
        title: expert.name,
        html: this.generateTemplate(expert),
      });
    },

    generateTemplate(expert) {
      return `
      <p>
        <b>Nome:</b> ${expert.name} <br>
        <b>Animal:</b> ${expert.animal} <br>
        <b>Grupo:</b> ${expert.group} <br>
        <b>Descrição:</b> ${expert.description}<br>
        <b>Anos de Experiência:</b> ${expert.years_experience} <br>
        <b>Localização:</b> ${expert.location.city} / ${expert.location.country}
      </p>
      `;
    },

    removeExpert(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o especialista?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`expert/${REMOVE_EXPERT}`, id).then(() => {
            this.$alert(this.getMessage, "Especialista removido!", "success");
            this.fetchExperts();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchExperts();
  }
};
</script>
