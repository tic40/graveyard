//
//  TableViewCell.swift
//  UITableView
//
//  Created by tic40 on 6/28/16.
//  Copyright © 2016 tic40. All rights reserved.
//

import UIKit

class TableViewCell: UITableViewCell {

    @IBOutlet var Label: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
