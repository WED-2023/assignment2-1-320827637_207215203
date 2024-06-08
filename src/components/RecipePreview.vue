<template>
  <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="recipe-preview"
  >
    <div class="recipe-body">
      <img :src="recipe.image" class="recipe-image"  alt=""/>
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li><strong>Preparation Time:</strong> {{ recipe.readyInMinutes }} Minutes</li>
        <li><strong>Likes:</strong> {{ recipe.aggregateLikes }}</li>
        <li><strong>Vegetarian:</strong> {{ recipe.vegetarian ? 'Yes' : 'No' }}</li>
        <li><strong>Vegan:</strong> {{ recipe.vegan ? 'Yes' : 'No' }}</li>
        <li><strong>Gluten Free:</strong> {{ recipe.glutenFree ? 'Yes' : 'No' }}</li>
      </ul>
    </div>
  </router-link>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
  margin: 10px 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
  border-bottom: 1px solid #ddd;
}

/* .recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
} */


/* //.recipe-preview .recipe-body .recipe-image {
//  margin-left: auto;
//  margin-right: auto;
//  margin-top: auto;
//  margin-bottom: auto;
//  display: block;
//  width: 100%;
//  height: auto;
//  max-height: 200px;
//  -webkit-background-size: contain;
//  -moz-background-size: contain;
//  background-size: contain;
//} */

.recipe-preview .recipe-body .recipe-image {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

}

.recipe-preview .recipe-footer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}

.recipe-preview .recipe-footer .recipe-title {
  font-size: 16pt;
  text-align: left;
  font-weight: bold;
  margin-bottom: 10px;
}

/*   //.recipe-preview .recipe-footer ul.recipe-overview {
//  padding: 5px 10px;
//  width: 100%;
//  display: -webkit-box;
//  display: -moz-box;
//  display: -webkit-flex;
//  display: -ms-flexbox;
//  display: flex;
//  -webkit-box-flex: 1;
//  -moz-box-flex: 1;
//  -o-box-flex: 1;
//  box-flex: 1;
//  -webkit-flex: 1 auto;
//  -ms-flex: 1 auto;
//  flex: 1 auto;
//  table-layout: fixed;
//  margin-bottom: 0px;
//} */

.recipe-preview .recipe-footer ul.recipe-overview {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

/*.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
  font-size: 12pt;
} */

.recipe-preview .recipe-footer ul.recipe-overview li {
  font-size: 12pt;
  text-align: left;
}

.recipe-preview .recipe-body .recipe-image:hover {
  transform: scale(1.05);
  cursor: pointer;
}


</style>
