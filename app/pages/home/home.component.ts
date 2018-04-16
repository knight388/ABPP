import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, AfterViewInit, NgZone } from "@angular/core";
import { User } from "../../shared/models/user/user";
import { Config } from "../../shared/config";
import { UserService } from "../../shared/models/user/user.service";
import { FormService } from "../../shared/models/form/form.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Router, ActivatedRoute } from "@angular/router";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui/sidedrawer/angular";  
import * as connectivity from "connectivity";
import { Sqlite } from "../../shared/data/providers/sqlite";

@Component({
  selector: "home",
  templateUrl: "pages/home/home.html",
  styleUrls: ["pages/home/home-common.css", "pages/home/home.css"],
  providers: [ FormService ]
})

export class HomeComponent implements OnInit {
  private drawer: SideDrawerType;
  public pages: Array<Object> = [];
  private isLoading : boolean = true;
  private isConnected : boolean = false;
  private pageTitle = 'Startpagina';
  private username = Config.username;

  @ViewChild(RadSideDrawerComponent)
  public drawerComponent: RadSideDrawerComponent;

  constructor(
    private formService: FormService,
    private _changeDetectionRef: ChangeDetectorRef,
    private routerExtensions: RouterExtensions,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private db: Sqlite
  ) { }

  ngOnInit(){
    //Init drawer
    this.drawer = this.drawerComponent.sideDrawer;

    if (this.drawer.ios) {
      //Dit zorgt ervoor dat de sidemenu op iOS ook een mooie schaduw heeft
      //Android heeft dit automagisch.
      this.drawer.ios.defaultSideDrawer.style.shadowMode = 2; 
      this.drawer.ios.defaultSideDrawer.style.dimOpacity = 0.35;
      this.drawer.ios.defaultSideDrawer.style.shadowOpacity = 0.75;
      this.drawer.ios.defaultSideDrawer.style.shadowRadius = 5; 
      this.drawer.ios.defaultSideDrawer.transitionDuration = 0.4;
    }

    this.formService.loadMenu()
    .subscribe(
      menuList => {
        //JSON Menu
        this.pages = menuList;
        //Standaard demo pagina
        this.pages.unshift({id:'99',title:'Startpagina'});
        this.isLoading = false;
      }
    );
    this.checkConnection(); 
    this._changeDetectionRef.detectChanges();

    //Debug
    
    this.pageTitle = 'Debug';
    this.router.navigate(["home", 1]);
    this.drawer.closeDrawer();
    this._changeDetectionRef.detectChanges();
    //
    connectivity.startMonitoring(function onConnectionTypeChanged(newConnectionType: number) {
    switch (newConnectionType) {
        case connectivity.connectionType.none:

            //console.log("Connection type changed to none.");
            this.isConnected = false;
            Config.isNetworkAvailable = false;
            break;
        case connectivity.connectionType.wifi:
            //console.log("Connection type changed to WiFi.");
            this.isConnected = true;
            Config.isNetworkAvailable = true;
            this.checkQueue();
            break;
        case connectivity.connectionType.mobile:
            //console.log("Connection type changed to mobile.");
            this.isConnected = true;
            Config.isNetworkAvailable = true;
            this.checkQueue();
            break;
    }
  });
  }

  checkQueue(){
     //this.db.clearQueue();
     console.log('checkQueue');
     this.db.getQueueWithStatus('0').then((data)=>{
        data.forEach((row)=>{
          console.log(JSON.stringify({
                                      row:row
                              }));
          console.log('row[0]' + row[0]);
          console.log('row[1]' + row[1]);
          console.log('row[2]' + row[2]);
          console.log('row[3]' + row[3]);
          console.log('row[4]' + row[4]);
          
          // Resubmit
          // FormID(ElementID) = row[1];
          // Form(DataString) = row[2];
          this.formService.submitForm(row[1], row[2]).subscribe((response)=>{
              console.log(response);
              this.db.updateQueueById(row[0]).then((updateResponse)=>{
                console.log('updateResponse = ');
                console.log(updateResponse);
              });
            });
        });
    });
  }


  checkConnection(){
    switch(connectivity.getConnectionType()){
        case connectivity.connectionType.none:
            this.isConnected=false;
            Config.isNetworkAvailable = false;
            break;
        case connectivity.connectionType.wifi:
            this.isConnected=true;
            Config.isNetworkAvailable = true;
            this.checkQueue();
            break;
        case connectivity.connectionType.mobile:
            this.isConnected=true;
            Config.isNetworkAvailable = true;
            this.checkQueue();
            break; 

        default:
            this.isConnected=false;
           break;
        }
    this._changeDetectionRef.detectChanges();
  }

  toggleDrawer(){
    this.drawer.toggleDrawerState();
  }

  onMenuItemTap(args){
    console.log('args.index= '+args.index);
    let page = this.pages[args.index];
    this.pageTitle = page['title'];
    console.log('page[id]=' + page['id']);
    this.router.navigate(["home", page['id']]);
    this.drawer.closeDrawer();
    this._changeDetectionRef.detectChanges();
  }

  tapOfflineLabel(){
    alert("U kunt nog steeds gebruik maken van de app. "+
    "Nieuwe formulieren en opgeslagen formulieren worden automatisch"+
    "gesynchroniseerd zodra er weer een internet verbinding beschikbaar is.");
  }

  tapCall(){
    alert(1);
  }
  
  tapLogout(){
    //this.checkQueue();
  
    this.db.clearAll();
    this.routerExtensions.navigate(["/"], 
        {
          clearHistory:true,
          transition:{
            name:"fade",
            duration:400,
            curve:"linear"
          }
        });
  }
}