//
//  ViewController.swift
//  UIActivityIndicatorView
//
//  Created by tic40 on 6/26/16.
//  Copyright © 2016 tic40. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet var Activity: UIActivityIndicatorView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func Start(sender: UIButton) {
        self.Activity.startAnimating()
    }

    @IBAction func Stop(sender: UIButton) {
        self.Activity.stopAnimating()
    }
}

