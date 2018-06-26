import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveSectionListItem } from '../models/hive-section-list-item';
import { HiveService } from '../services/hive.service';

@Component({
  selector: 'app-hive-section-list',
  templateUrl: './hive-section-list.component.html',
  styleUrls: ['./hive-section-list.component.css']
})
export class HiveSectionListComponent implements OnInit {

  hiveId: number;
  hiveSections: Array<HiveSectionListItem>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveService: HiveService
  ) { }

  onDelete(hiveSectionId: number){
    var hiveSection = this.hiveSections.find(h => h.id == hiveSectionId);
    this.hiveService.setHiveStatus(hiveSectionId, true).subscribe(c => hiveSection.isDeleted = true);
  }

  onUndelete(hiveSectionId: number){
    var hiveSection = this.hiveSections.find(h => h.id == hiveSectionId);
    this.hiveService.setHiveStatus(hiveSectionId, false).subscribe(c => hiveSection.isDeleted = false);
  }

  ngOnInit() {
  this.route.params.subscribe(p => {
    this.hiveId = p['id'];
    this.hiveService.getHiveSections(this.hiveId).subscribe(s => this.hiveSections = s);
  })
}
}
