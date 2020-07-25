<script lang="ts">
import { Bar, mixins } from "vue-chartjs";
import { Component, Prop, Vue, PropSync } from "vue-property-decorator";

@Component({
  extends: Bar,
  mixins: [mixins.reactiveProp]
})
export default class BarChart extends Vue {
  @Prop() private chartData!: any;
  @Prop() private options!: any;
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
  public renderChart!: (chartData: any, options: any) => void;
}
</script>
