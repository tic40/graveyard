//
//  ViewController.swift
//  UILable
//
//  Created by tic40 on 6/21/16.
//  Copyright © 2016 tic40. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet var Label:UILabel!
    @IBOutlet var Label2:UILabel!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        self.Label.text = "swift"
        self.Label.textColor = UIColor.redColor()
        self.Label.textAlignment = NSTextAlignment.Center
        self.Label2.text = "swift 2"
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

