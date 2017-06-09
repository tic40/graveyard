//
//  ViewController.swift
//  UIActionSheet
//
//  Created by tic40 on 6/25/16.
//  Copyright © 2016 tic40. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func ActionSheet(sender:AnyObject) {
        let ActionAlert = UIAlertController(title: nil, message: "what do you want to do?", preferredStyle: .ActionSheet)
        let Save = UIAlertAction(title: "Save", style: .Default) { (Alert:UIAlertAction!) -> Void in
            print("Save")
        }
        let Delete = UIAlertAction(title: "Delete", style: .Default) { (Alert:UIAlertAction) in
            print("Delete")
        }
        let Cancel = UIAlertAction(title: "Cancel", style: .Default) { (Alert:UIAlertAction) in
            print("Cancel")
        }
        
        ActionAlert.addAction(Save)
        ActionAlert.addAction(Delete)
        ActionAlert.addAction(Cancel)
        
        self.presentViewController(ActionAlert, animated: true, completion: nil)
    }

}

