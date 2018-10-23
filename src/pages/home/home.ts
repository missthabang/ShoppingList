import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';




/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var firebase;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  name;
  items=[];
  list={
    name:''
  }
  itemKey = []
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    firebase.database().ref('/list/').on("value", (snapshot) => {
      this.itemKey= [];
      this.items = []
      snapshot.forEach((snap) => {


        console.log(snap.key)

        //append to list
        this.items.push(snap.val());
        this.itemKey.push(snap.key)

        return false;
      });
    });
  }

  Shop(){
    console.log(this.name);
    this.list.name = this.name;
    var database = firebase.database();
    database.ref('/list/').push(this.list);
   }


  update(i){
    
    i.name = "Dress";
    var database = firebase.database();
    database.ref('/list/'+i.key).set({name:i.name});
      }
    
  delete(i){

    var database = firebase.database();
    database.ref('/list/'+this.itemKey[i]).remove();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
