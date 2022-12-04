 create table payments(
  id varchar(50) default ' ' not null,
  name  varchar(50) default ' ' not null,
  paymentMode varchar(50) default ' ' null,
  paymentType varchar(50) default ' ' null,
  TotalAmount int default 0 null,
  constraint primary key(id,name)
 )
