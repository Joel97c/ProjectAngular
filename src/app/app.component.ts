import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from './models/recipe.model';
import {RecipeService} from './shared/recipe.service';
import {Ingredient} from './models/ingredient.model';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  question: boolean;
  recipes: any;
  selectedRecipe: any;
  updateRecipe: any;
  newRecipe: Recipe;
  newIngredient: Ingredient;
  editIngredient: Ingredient;
  formulario: FormGroup ;
  restrictedWords = ['burger', 'pizza', 'french fries', 'jelly'];

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.editIngredient = new Ingredient();
    this.newIngredient = new Ingredient();
    this.selectedRecipe = new Recipe();
    this.newRecipe = new Recipe();
    this.updateRecipe = new Recipe();
    this.getRecipes();
  }
  getRecipes() {
    this.recipeService.get('recipes').subscribe(
      (response) => {
        this.recipes = response;
      }
    );
  }
  getRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
    this.recipeService.get('recipes?id=' + this.selectedRecipe).subscribe(
      (response) => {
        this.selectedRecipe = response;
      });
  }


  postRecipe() {
    this.newRecipe.ingredients.id = this.newIngredient.id + 1;
    this.newRecipe.src = 'assets/img/generica.jpg'; // default img not path for news recipes
    this.newRecipe.state = 'not read'; // default state false for news recipes
    this.newRecipe.ingredients.state = true;
    this.newRecipe.ingredients.quantity = '1.5';
    this.recipeService.post('recipes', this.newRecipe).subscribe(
      (reponse) => {
        if (reponse) {
          alert('You successfully added a new recipe');
          this.newRecipe = new Recipe();
          this.getRecipes();
        }
      });
  }

  deleteRecipe(dataRecipe) {
    this.question = confirm('¿Are you sure?');
    if (this.question) {
      this.recipeService.delete('recipes/' + dataRecipe.id).subscribe(
        (responde) => {
          this.getRecipes();
        });
    }
  }

  putRecipe(dataRecipe: Recipe) {
    this.updateRecipe = dataRecipe;
    this.recipeService.put('recipes/' + this.updateRecipe.id , this.updateRecipe).subscribe(
      (response) => {
        if (response) {
          alert('update successfully');
          this.getRecipes();
        }
      });
  }
  /*
  wordsData() {
      const checkWords = (word) => {
      const rgx = new RegExp(this.restrictedWords.join('|') + '|' + '/gi');
      return (rgx.test(word));
    };
      $('#btn_save').click( ( ) => {
        const word = $('#name')().val().toLowerCase();

        if (checkWords(word) === true) {
          window.alert('Upss....: ' + word);
      } else {

        }
    });
  }

*/
  }


