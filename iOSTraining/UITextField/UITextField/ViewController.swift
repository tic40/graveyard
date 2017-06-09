//
//  ViewController.swift
//  UITextField
//
//  Created by tic40 on 6/21/16.
//  Copyright © 2016 tic40. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet var TextField:UITextField!
    @IBOutlet var Label:UILabel!
    @IBOutlet var Button:UIButton!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func ShowText(sender:AnyObject) {
        self.Label.text = self.TextField.text
    }


}

