//
//  ViewController.swift
//  UISegmentControl
//
//  Created by tic40 on 6/24/16.
//  Copyright © 2016 tic40. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet var Label: UILabel!
    @IBOutlet var Segment: UISegmentedControl!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func Action(sender: UISegmentedControl) {
        
        switch Segment.selectedSegmentIndex {
        case 0:
            self.Label.text = "0"
            break
        case 1:
            self.Label.text = "1"
            break
        case 2:
            self.Label.text = "2"
            break
        default:
            break
        }
    }

}

