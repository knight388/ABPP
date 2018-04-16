import { Injectable } from "@angular/core";
import { Repository } from "../repository";
import { Config } from "../../Config";
var sql = require("nativescript-sqlite");

Injectable()
export class Sqlite implements Repository {
    
    private db: any; //DB Handler
    private authToken: any;
    private isInstantiated: boolean; //Singleton style

    //Queries
    private qDbname: string = "abpp.db";
    private qCreateSettingsTable: string = "CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, `key` VARCHAR(100), `value` TEXT)";
    private qCreateFormsTable: string = "CREATE TABLE IF NOT EXISTS forms (id INTEGER PRIMARY KEY AUTOINCREMENT, form_id INTEGER, title TEXT, json TEXT, updated_at DATE DEFAULT (datetime('now','localtime')))";
    private qCreateQueuesTable: string = "CREATE TABLE IF NOT EXISTS queue (id INTEGER PRIMARY KEY AUTOINCREMENT, form_id INTEGER, payload TEXT,  updated_at DATE DEFAULT (datetime('now','localtime')), status INTEGER DEFAULT 0)";

    // State in Queue
    private PENDING_STATE = 0;
    private PROCESSED_STATE = 1;

    //Getters
    private qGetSetting = "SELECT * FROM settings WHERE `key`=?";
    private qGetForm = "SELECT * FROM forms where form_id=?";
    private qGetOneQueue = "SELECT * FROM queue WHERE form_id=?";
    private qGetAllQueueStatus = "SELECT * FROM queue WHERE status=?";
    private qGetAllForms = "SELECT * FROM forms";
    private qGetAllSettings = "SELECT * FROM settings";
    private qGetAllQueue = "SELECT * FROM queue";

    //Setters
    private qSetSetting = "INSERT OR REPLACE INTO settings (id, `key`, `value`) VALUES ((SELECT id FROM settings WHERE `key`=?),?,?)";
    private qSetForm = "INSERT OR REPLACE INTO forms (id, form_id, title, json) VALUES ((SELECT id FROM forms WHERE `form_id`=?),?,?,?)";
    private qAddToQueue = "INSERT INTO queue (form_id, payload) VALUES (?,?)";
    private qUpdateQueue = "UPDATE queue SET status=? WHERE form_id=?";
    private qUpdateQueueById = "UPDATE queue SET status=? WHERE id=?";
    private qClearQueue = "DELETE FROM queue WHERE 0=0";
    private qClearForms = "DELETE FROM forms WHERE 0=0";
    private qClearSettings = "DELETE FROM settings WHERE 0=0";
    private qDeleteSetting = "DELETE FROM settings WHERE `key`=?";

    //https://stackoverflow.com/questions/36269197/sqlite-exception-from-delete

    public constructor(){
        //DB Aanmaken + tabellen
        if(!this.isInstantiated){
            //sql.deleteDatabase(this.qDbname);
            this.db = (new sql(this.qDbname));
            this.db.then(db=>{ 
                db.execSQL(this.qCreateSettingsTable).then(id=>{
                }, error => {
                    console.error('Failed to create settings table!');
                });

                db.execSQL(this.qCreateFormsTable).then(id=>{
                }, error => {
                    console.error('Failed to create forms table!');
                });

                db.execSQL(this.qCreateQueuesTable).then(id=>{
                }, error => {
                    console.error('Failed to create queus table!');
                });

                //this.db = db;
                this.isInstantiated = true;

            }, error => {
                console.error('Failed to open DB!');
            });
        }
    }

    getDbHandler(){
        return this.db;
    }

    setAuth(token_id){
        return this.setSetting('auth',token_id);
    }

    getAuth(){
        return this.getSetting('auth');
    }

    clearAuth(){
        this.db.then(db=>{
            db.execSQL(this.qDeleteSetting,['auth']).then(()=>{
                return true;
            }, error => this.errorHandler(error));
        });
    }

    setForm(form){
        this.db.then(db=>{
            db.execSQL(this.qSetForm,[form.Id, form.Id,form.Title,form]).then(value=>{
                return true;
            }, error => this.errorHandler(error));
        });
    }

    getForm(form_id){
        return this.db.then(db=>{
            return db.get(this.qGetForm,[form_id], function(err,row){
                //row[2];
            });
        });
    }

    getAllForms(){
        return this.db.then(db=>{
            return db.get(this.qGetAllForms,function(err,rows){});
        });
    }

    clearForms(){
        this.db.then(db=>{
            console.log('clearQueue');
            db.execSQL(this.qClearForms).then((rows)=>{
                console.log('deleted Form Rows Count = ' + rows)
                return rows;
            },
            (error)=>{
                console.log("DELETE ERROR", error);
            });
        });
    }

    getSettings(){
        return this.db.then(db=>{
            return db.all(this.qGetAllSettings).then(rows=>{
                //console.dump(rows);
                return rows;
            }, error => this.errorHandler(error) );
        });
    } 


    getSetting(key){
        return this.db.then(db=>{
            return db.get(this.qGetSetting,[key], function(err,row){
                if(err){
                    this.errorHandler(err);
                }
            });
        });
    }

    setSetting(key, value){
        return this.db.then(db=>{
            return db.execSQL(this.qSetSetting,[key, key,value]).then(value=>{
            }, error => this.errorHandler(error));
        });
    }

    setSettings(settings){
        return this.db.then(db=>{
            for(let key in settings){
                db.execSQL(this.qSetSetting,[key, key, settings[key]])
                .then(res=>{}, error => this.errorHandler(error));
            }
        });
    }

    clearSettings(){
        this.db.then(db=>{
            console.log('clearQueue');
            db.execSQL(this.qClearSettings).then((rows)=>{
                console.log('deleted Settings Rows Count = ' + rows)
                return rows;
            },
            (error)=>{
                console.log("DELETE ERROR", error);
            });
        });
    }

    addToQueue(form_id, payload){
        return this.db.then(db=>{
            return db.execSQL(this.qAddToQueue,[form_id, payload]).then(id=>{
                //returns ID
                console.log('added Queue Id = ' +id);
            }, error => this.errorHandler(error));
        });
       
    }

    getOneQueue(queu_id){
        return this.db.then(db=>{
            return db.get(
                this.qGetOneQueue,[queu_id],
                function(err,row){}
            );
        });
    }
    /*
    original was execSQL
    GET SQL Statement should be start with all
    like db.all
    */
    getQueueWithStatus(status){
        return this.db.then(db=>{
            //return db.execSQL()
            return db.all(
                this.qGetAllQueueStatus,[status]).then(
                rows=>{
                    console.log('getQueueWithStatus');
                    console.log('rows =' + JSON.stringify({
                          rows:rows
                        }));
                    return rows;
                }, error =>{
                    console.log("SELECT ERROR", error);
                }); 
        }); 
    }

    getQueue(){
        return this.db.then(db=>{
            return db.get(
                this.qGetAllQueue, 
                function(err,rows){}
            );
        });
    }

    updateQueueById(id){
        return this.db.then(db=>{
            console.log('updateQueueById');
            db.execSQL(this.qUpdateQueueById, [this.PROCESSED_STATE,id]).then((rows)=>{
                console.log('updated Queue Rows Count = ' + rows)
                return rows;
            },
            (error)=>{
                console.log("UPDATE ERROR", error);
            });
        });
    }
    clearQueue(){
        this.db.then(db=>{
            console.log('clearQueue');
            db.execSQL(this.qClearQueue).then((rows)=>{
                console.log('deleted Queue Rows Count = ' + rows)
                return rows;
            },
            (error)=>{
                console.log("DELETE ERROR", error);
            });
        });
    } 

    clearAll(){
        this.clearForms();
        this.clearQueue();
        this.clearSettings();
    }

    errorHandler(error){
        console.error("DataBase Handling Error: "+error);
    }
}