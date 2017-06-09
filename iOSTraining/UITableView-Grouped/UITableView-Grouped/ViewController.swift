//
//  ViewController.swift
//  UITableView-Grouped
//
//  Created by tic40 on 6/26/16.
//  Copyright © 2016 tic40. All rights reserved.
//

import UIKit

class ViewController: UITableViewController {

    @IBOutlet var Name: UITextField!
    @IBOutlet var Password: UITextField!
    @IBOutlet var UserName: UITextField!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func Button(sender: UISwitch) {
        if sender.on{
            print("button is on")
        } else {
            print("button is off")
        }
    }
    @IBAction func Stepper(sender: UIStepper) {
        print(sender.value.description)
    }
    @IBAction func Segment(sender: UISegmentedControl) {
        switch sender.selectedSegmentIndex {
            case 0:
                print("Segment equals 0")
                break
            case 1:
                print("Segment equals 1")
                break
            default:
                break
        }
    }
    
}

