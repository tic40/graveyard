//
//  ViewController.swift
//  UIButton
//
//  Created by tic40 on 6/20/16.
//  Copyright © 2016 tic40. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet var Button:UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func actionForButton(){
        
        var alert:UIAlertView = UIAlertView(title: "Button", message: "You pressed Button", delegate: self, cancelButtonTitle: "OK")
        alert.show()
    }

}

