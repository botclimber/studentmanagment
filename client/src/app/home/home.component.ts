import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HomeService} from '../service/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  _file:File= null;
  constructor(private route: ActivatedRoute, private HomeService:HomeService) {}

  ngOnInit(): void {
  }
  
  submitFile(file){
	  console.log(file);
	  this._file=file.target.files[0];
    console.log('o ficheiro:' + this._file.name);
	this.HomeService.uploadFile(this._file).subscribe(result => {
      
    });
  }
  }
  


