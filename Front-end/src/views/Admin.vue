<template>
  <section class="page-section">
    <b-container fluid>
      <HeaderPage title="Gestão do Animalec" />

      <b-row>
        <AdminOptionBox
          routeName="listUsers"
          iconName="users"
          title="Utilizadores"
        />
        <AdminOptionBox
          routeName="listAnimals"
          iconName="dog"
          title="Animais"
        />
        <AdminOptionBox
          routeName="listExperts"
          iconName="star"
          title="Especialistas"
        />
        <AdminOptionBox
          routeName="listSponsors"
          iconName="check"
          title="Patrocinadores"
        />
        <AdminOptionBox
          routeName="listQuizzes"
          iconName="file-alt"
          title="Quizzes"
        />
        <AdminOptionBox
          routeName="listQuestions"
          iconName="question-circle"
          title="Questões"
        />
      </b-row>
    </b-container>
  </section>
</template>
<script>
import HeaderPage from "@/components/HeaderPage.vue";
import AdminOptionBox from "@/components/AdminOptionBox.vue";

export default {
  components: {
    HeaderPage,
    AdminOptionBox
  }
};
</script>
