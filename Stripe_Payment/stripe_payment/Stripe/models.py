from django.db import models

class Card(models.Model):
  card_num = models.CharField(max_length=200)
  exp_month = models.CharField(max_length=5)
  exp_year = models.CharField(max_length=5)
  cvc = models.CharField(max_length=5)
  plan_num = models.CharField(default = "1", max_length=5)
      
  def __str__(self):
    return self.num_card