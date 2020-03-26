<template>
  <div>
    <v-toolbar color="transparent" flat>
      <v-toolbar-title>Prevention</v-toolbar-title>
    </v-toolbar>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="error--text font-weight-regular">
            There’s currently no vaccine to prevent coronavirus disease (COVID-19).
          </v-card-title>
          <v-card-text>
            <p>You can protect yourself and help prevent spreading the virus to others if you:</p>
            <v-row>
              <v-col lg="6" md="6" sm="12" cols="12">
                <div class="headline success--text">Do</div>
                <ul>
                  <li>Stay home when you are sick.</li>
                  <li>Avoid touching your eyes, nose, and mouth.</li>
                  <li>Clean AND disinfect frequently touched surfaces daily.</li>
                  <li>Cover your cough or sneeze with a tissue, then throw the tissue in the trash.</li>
                  <li>Avoid close contact with people who are sick.</li>
                  <li>Wash your hands often with soap and water for at least 20 seconds, especially after going to the bathroom; before eating; and after blowing your nose, coughing, or sneezing.</li>
                </ul>
              </v-col>
              <v-col lg="6" md="6" sm="12" cols="12">
                <div class="headline error--text">Don't</div>
                <ul>
                  <li>Touch your eyes, nose, or mouth if your hands are not clean</li>
                  <li>Shake hands with others</li>
                  <li>Wear face mask if you aren't infected or aren't taking care of individuals infected by Covid19</li>
                  <li>Go to to pharmacy or hospital. If you have corona like symptoms, call 1500 instead</li>
                  <li>Go out in groups or where there are a large number of people. Avoid crowds as much as possible</li>
                </ul>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {

}
</script>