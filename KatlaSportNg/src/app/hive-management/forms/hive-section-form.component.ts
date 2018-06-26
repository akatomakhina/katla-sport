import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveSection } from 'app/hive-management/models/hive-section';
import { HiveService } from 'app/hive-management/services/hive.service';
import { HiveListItem } from 'app/hive-management/models/hive-list-item';
import { HiveSectionService } from 'app/hive-management/services/hive-section.service';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-hive-section-form',
  templateUrl: './hive-section-form.component.html',
  styleUrls: ['./hive-section-form.component.css']
})
export class HiveSectionFormComponent implements OnInit {

  hiveSection = new HiveSection(0,'','',0,false,'');
  hives: HiveListItem[];

  storeHiveId: number;
  existed = false;

  constructor(
  	private route: ActivatedRoute,
    private router: Router,
    private hiveService: HiveService,
    private hiveSectionService: HiveSectionService
  ) { }

  ngOnInit() {
  	this.hiveService.getHives().subscribe(hArr => this.hives = hArr);
    this.route.params.subscribe(k => {
      this.storeHiveId = toInteger(k['storeHiveId']);
      if(k['id'] === undefined) {
        this.hiveSection.storeHiveId = this.storeHiveId;
      } else {
        this.hiveSectionService.getHiveSection(k['id']).subscribe(hs => {
          this.hiveSection = hs;
          if(isNaN(this.storeHiveId)){
            this.storeHiveId = hs.storeHiveId;
          }
        });
        this.existed = true;
      }
    });
  }

  navigateToHivesSections() {
    this.router.navigate([`/hive/${this.storeHiveId}/sections`]);
  }

  onCancel() {
    this.navigateToHivesSections();
  }

  onSubmit(){
    if(this.existed){
      this.hiveSectionService.updateHiveSection(this.hiveSection).subscribe(() => this.navigateToHivesSections());
    } else {
      this.hiveSectionService.addHiveSection(this.hiveSection).subscribe(() => this.navigateToHivesSections());
    }
  }

  onDelete(){
    this.hiveSectionService.setHiveSectionStatus(this.hiveSection.id, true).subscribe(() => this.hiveSection.isDeleted = true);
  }

  onRestore(){
    this.hiveSectionService.setHiveSectionStatus(this.hiveSection.id, false).subscribe(() => this.hiveSection.isDeleted = false);
  }

  onPurge(){
    this.hiveSectionService.deleteHiveSection(this.hiveSection.id).subscribe(() => this.navigateToHivesSections());
  }
}
