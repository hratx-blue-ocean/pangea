resource "aws_instance" "pangea" {
  ami           = var.AMIS[var.AWS_REGION]
  instance_type = "t2.micro"
}

