"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseLayer = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const resourceawarestack_1 = require("./../resourceawarestack");
const DynamoDB = require("aws-cdk-lib/aws-dynamodb");
class DatabaseLayer extends resourceawarestack_1.ResourceAwareConstruct {
  constructor(parent, name, props) {
    super(parent, name, props);
    this.tables = new Map();
    let sessionTable = new DynamoDB.Table(
      this,
      props.getApplicationName() + "Session",
      {
        tableName: props.getApplicationName() + "Session",
        partitionKey: {
          name: "SessionId",
          type: DynamoDB.AttributeType.STRING,
        },
        billingMode: DynamoDB.BillingMode.PROVISIONED,
        removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
      }
    );
    sessionTable.autoScaleWriteCapacity({
      minCapacity: 1,
      maxCapacity: 1,
    });
    sessionTable.autoScaleReadCapacity({
      minCapacity: 1,
      maxCapacity: 1,
    });
    this.addResource("table.session", sessionTable);
    let sessionControlTable = new DynamoDB.Table(
      this,
      props.getApplicationName() + "SessionControl",
      {
        tableName: props.getApplicationName() + "SessionControl",
        partitionKey: {
          name: "SessionId",
          type: DynamoDB.AttributeType.STRING,
        },
        billingMode: DynamoDB.BillingMode.PAY_PER_REQUEST,
        removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
      }
    );
    this.addResource("table.sessioncontrol", sessionControlTable);
    let sessionTopXTable = new DynamoDB.Table(
      this,
      props.getApplicationName() + "SessionTopX",
      {
        tableName: props.getApplicationName() + "SessionTopX",
        partitionKey: {
          name: "SessionId",
          type: DynamoDB.AttributeType.STRING,
        },
        billingMode: DynamoDB.BillingMode.PAY_PER_REQUEST,
        removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
      }
    );
    this.addResource("table.sessiontopx", sessionTopXTable);
  }
}
exports.DatabaseLayer = DatabaseLayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2VMYXllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFiYXNlTGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsNkNBQTZDO0FBQzdDLGdFQUFzRjtBQUV0RixxREFBc0Q7QUFHdEQsTUFBYSxhQUFjLFNBQVEsMkNBQXNCO0lBR3JELFlBQVksTUFBaUIsRUFBRSxJQUFZLEVBQUUsS0FBMkI7UUFDcEUsS0FBSyxDQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFIOUIsV0FBTSxHQUFnQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBSzVDLElBQUksWUFBWSxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLEdBQUMsU0FBUyxFQUFFO1lBQzdFLFNBQVMsRUFBRyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsR0FBQyxTQUFTO1lBQ2hELFlBQVksRUFBRztnQkFDWCxJQUFJLEVBQUcsV0FBVztnQkFDbEIsSUFBSSxFQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTTthQUN2QztZQUNELFdBQVcsRUFBRyxRQUFRLENBQUMsV0FBVyxDQUFDLGVBQWU7WUFDbEQsYUFBYSxFQUFHLDJCQUFhLENBQUMsT0FBTztTQUN4QyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBQyxZQUFZLENBQUMsQ0FBQztRQUUvQyxJQUFJLG1CQUFtQixHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLEdBQUMsZ0JBQWdCLEVBQUU7WUFDM0YsU0FBUyxFQUFHLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxHQUFDLGdCQUFnQjtZQUN2RCxZQUFZLEVBQUc7Z0JBQ1gsSUFBSSxFQUFHLFdBQVc7Z0JBQ2xCLElBQUksRUFBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDdkM7WUFDRCxXQUFXLEVBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxlQUFlO1lBQ2xELGFBQWEsRUFBRywyQkFBYSxDQUFDLE9BQU87U0FDeEMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsRUFBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRTdELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsR0FBQyxhQUFhLEVBQUU7WUFDckYsU0FBUyxFQUFHLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxHQUFDLGFBQWE7WUFDcEQsWUFBWSxFQUFHO2dCQUNYLElBQUksRUFBRyxXQUFXO2dCQUNsQixJQUFJLEVBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQ3ZDO1lBQ0QsV0FBVyxFQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsZUFBZTtZQUNsRCxhQUFhLEVBQUcsMkJBQWEsQ0FBQyxPQUFPO1NBQ3hDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0NBQ0o7QUF2Q0Qsc0NBdUNDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTUlULTBcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgIFJlbW92YWxQb2xpY3kgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBSZXNvdXJjZUF3YXJlQ29uc3RydWN0LCBJUGFyYW1ldGVyQXdhcmVQcm9wcyB9IGZyb20gJy4vLi4vcmVzb3VyY2Vhd2FyZXN0YWNrJ1xuXG5pbXBvcnQgRHluYW1vREIgPSByZXF1aXJlKCdhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGInKTtcblxuXG5leHBvcnQgY2xhc3MgRGF0YWJhc2VMYXllciBleHRlbmRzIFJlc291cmNlQXdhcmVDb25zdHJ1Y3Qge1xuICAgIHRhYmxlcyA6IE1hcDxzdHJpbmcsRHluYW1vREIuVGFibGU+ID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3RydWN0b3IocGFyZW50OiBDb25zdHJ1Y3QsIG5hbWU6IHN0cmluZywgcHJvcHM6IElQYXJhbWV0ZXJBd2FyZVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHBhcmVudCxuYW1lLCBwcm9wcyk7XG4gICAgICAgIFxuICAgICAgICBsZXQgc2Vzc2lvblRhYmxlID0gbmV3IER5bmFtb0RCLlRhYmxlKHRoaXMscHJvcHMuZ2V0QXBwbGljYXRpb25OYW1lKCkrJ1Nlc3Npb24nLCB7XG4gICAgICAgICAgICB0YWJsZU5hbWUgOiBwcm9wcy5nZXRBcHBsaWNhdGlvbk5hbWUoKSsnU2Vzc2lvbicsXG4gICAgICAgICAgICBwYXJ0aXRpb25LZXkgOiB7XG4gICAgICAgICAgICAgICAgbmFtZSA6ICdTZXNzaW9uSWQnLFxuICAgICAgICAgICAgICAgIHR5cGUgOiBEeW5hbW9EQi5BdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbGxpbmdNb2RlIDogRHluYW1vREIuQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNUICAgLFxuICAgICAgICAgICAgcmVtb3ZhbFBvbGljeSA6IFJlbW92YWxQb2xpY3kuREVTVFJPWSAgIFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hZGRSZXNvdXJjZSgndGFibGUuc2Vzc2lvbicsc2Vzc2lvblRhYmxlKTtcblxuICAgICAgICBsZXQgc2Vzc2lvbkNvbnRyb2xUYWJsZSA9IG5ldyBEeW5hbW9EQi5UYWJsZSh0aGlzLHByb3BzLmdldEFwcGxpY2F0aW9uTmFtZSgpKydTZXNzaW9uQ29udHJvbCcsIHtcbiAgICAgICAgICAgIHRhYmxlTmFtZSA6IHByb3BzLmdldEFwcGxpY2F0aW9uTmFtZSgpKydTZXNzaW9uQ29udHJvbCcsXG4gICAgICAgICAgICBwYXJ0aXRpb25LZXkgOiB7XG4gICAgICAgICAgICAgICAgbmFtZSA6ICdTZXNzaW9uSWQnLFxuICAgICAgICAgICAgICAgIHR5cGUgOiBEeW5hbW9EQi5BdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbGxpbmdNb2RlIDogRHluYW1vREIuQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNULFxuICAgICAgICAgICAgcmVtb3ZhbFBvbGljeSA6IFJlbW92YWxQb2xpY3kuREVTVFJPWSAgIFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hZGRSZXNvdXJjZSgndGFibGUuc2Vzc2lvbmNvbnRyb2wnLHNlc3Npb25Db250cm9sVGFibGUpO1xuXG4gICAgICAgIGxldCBzZXNzaW9uVG9wWFRhYmxlID0gbmV3IER5bmFtb0RCLlRhYmxlKHRoaXMscHJvcHMuZ2V0QXBwbGljYXRpb25OYW1lKCkrJ1Nlc3Npb25Ub3BYJywge1xuICAgICAgICAgICAgdGFibGVOYW1lIDogcHJvcHMuZ2V0QXBwbGljYXRpb25OYW1lKCkrJ1Nlc3Npb25Ub3BYJyxcbiAgICAgICAgICAgIHBhcnRpdGlvbktleSA6IHtcbiAgICAgICAgICAgICAgICBuYW1lIDogJ1Nlc3Npb25JZCcsXG4gICAgICAgICAgICAgICAgdHlwZSA6IER5bmFtb0RCLkF0dHJpYnV0ZVR5cGUuU1RSSU5HXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmlsbGluZ01vZGUgOiBEeW5hbW9EQi5CaWxsaW5nTW9kZS5QQVlfUEVSX1JFUVVFU1QsXG4gICAgICAgICAgICByZW1vdmFsUG9saWN5IDogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFkZFJlc291cmNlKCd0YWJsZS5zZXNzaW9udG9weCcsc2Vzc2lvblRvcFhUYWJsZSk7XG4gICAgfVxufSJdfQ==
